(() => {
	'use strict';

	window.hidePromotedTweets = waitFor => {
		const seekAndDestroy = () => waitFor('.vjrx_CgX').then(el => {
			el.closest('div[class*="_222QxFjc"][role="row"]').style.display = 'none';
		});

		waitFor('._1nQuzuNK._3tixQkQf > ._3tixQkQf').then(tweetContainer => {
			// Hide any immediately seen ads
			seekAndDestroy();

			// Watch tweetContainer to hide new ads that get added
			new MutationObserver(() => {
				seekAndDestroy();
			}).observe(tweetContainer, {attributes: true, childList: true});
		});
	};

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = window.hidePromotedTweets;
	}
})();
