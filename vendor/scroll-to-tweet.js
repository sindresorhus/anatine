/*

This is copied from:
https://github.com/sindresorhus/refined-twitter/blob/master/extension/scroll-to-tweet.js

Updates should happen there first.

*/

'use strict'
const scrollToTweet = event => { // eslint-disable-line
	const $ = document.querySelector.bind(document);
	const tweets = document.querySelectorAll('._222QxFjc[role="row"]');
	const currentTop = window.scrollY;
	const bufferTop = 5; // added because somtimes the scrolling is off by a few px
	const keyCode = event.charCode; // TODO: replace with key when Chrome 51 is out https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key

	// calculate the height of the navigation/header to use for scrolling
	const calculatedNavHeight = $('header').clientHeight + ($('header').clientHeight - $('nav').clientHeight);

	// this padding has to be applied to factor in the padding that's added to the container
	const tweetsContainerPadding = Math.ceil(parseInt($('._1nQuzuNK').style.paddingTop.replace('px', ''), 10));

	const offsetToNotShowTweetTopBorder = 2;

	// shortcut for getting the total offset from the top of the document of a particular tweet
	const totalOffset = tweetOffset => tweetOffset + calculatedNavHeight + tweetsContainerPadding + offsetToNotShowTweetTopBorder;

	// takes a tweet's offsetTop and checks if it's below the navigation bar
	const tweetIsBelowNav = offset => totalOffset(offset) > currentTop + bufferTop;

	let scrollTarget = 0;

	Array.from(tweets).some((tweet, index) => {
		// TODO: Replace with for...of loop when Chrome 51 is released https://mobile.twitter.com/chromiumdev/status/717736215433256960
		// if we're scrolling down, grab the offset of the tweet below the nav
		if (keyCode === 106) {
			scrollTarget = totalOffset(tweet.offsetTop);
		}

		// if we're scrolling up and on the first two items scroll to 0
		if (keyCode === 107 && index <= 1) {
			scrollTarget = 0;
		}

		// if we're scrolling up, grab the offset of the tweet before last
		if (keyCode === 107 && index > 1) {
			scrollTarget = totalOffset(tweets[index - 2].offsetTop);
		}

		return tweetIsBelowNav(tweet.offsetTop);
	});

	window.scrollTo(0, scrollTarget);
};

module.exports = scrollToTweet;
