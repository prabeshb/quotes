import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {ModalController} from "ionic-angular";


import { Quote } from "../../data/quote.interface";
import { QuotesService } from "../../services/quotes";

import {QuotePage} from "../quote/quote";
import { SettingsService } from "../../services/settings";

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {

  quotes: Quote[];

  constructor (private quotesService: QuotesService,
  	private modalCtrl: ModalController,
  	private settingsService: SettingsService) {}

  ionViewWillEnter() {
  	this.quotes = this.quotesService.getFavoriteQuote();
  }

	onViewQuote(quote: Quote) {
		const modal = this.modalCtrl.create(QuotePage, quote);
		modal.present();
		modal.onDidDismiss((remove: boolean) => {
			if (remove) {
				this.onRemoveFromFavorites(quote);
			}
		});
	}

	onRemoveFromFavorites(quote: Quote) {
		this.quotesService.removeQuoteFromFavorites(quote);
		// this.quotes = this.quotesService.getFavoriteQuote();
		const position = this.quotes.findIndex((quoteEL: Quote) => {
			return quoteEL.id == quote.id;
		});
		this.quotes.splice(position, 1);
	}

	getBackground() {
		return this.settingsService.isAltBackground() ? 'altQuoteBackground' : 'quoteBackground';
	}
	
	isAltBackground() {
		return this.settingsService.isAltBackground();
	}
}
