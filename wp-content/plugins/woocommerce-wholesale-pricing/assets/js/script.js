jQuery( document ).ready(
	function () {
		jQuery( '.variations_form' ).on(
			'found_variation',
			function ( event, variation ) {
				console.log( variation['price_html'] );
			}
		);
		jQuery( '#wwp_wholesaler_copy_billing_address' ).change(
			function () {
				if ( ! this.checked) {
					// ^
					jQuery( '#wholesaler_shipping_address' ).fadeIn( 'slow' );
				} else {
					jQuery( '#wholesaler_shipping_address' ).fadeOut( 'slow' );
				}
			}
		);

		jQuery( ".single_variation_wrap" ).on(
			"show_variation",
			function ( event, variation ) {

				tire_ajax_call( jQuery( '.variation_id' ).val() );

			}
		);

		jQuery( ".variations_form" ).on(
			"woocommerce_variation_select_change",
			function () {
				// Fires whenever variation selects are changed
			}
		);

		jQuery( 'input.qty' ).on(
			"change",
			function(){
				if (wwpscript.product_type == 'variable') {
					tire_ajax_call( jQuery( '.variation_id' ).val() );
				} else {
					tire_ajax_call( wwpscript.product_id );
				}

			}
		);

	}
);

function tire_ajax_call( variation_id ) {
		   // alert( variation.variation_id );
		   // console.log( variation );

		   quantity = jQuery( 'input.qty' ).val();

		   console.log( quantity );

		   jQuery( '#wholesale_tire_price .row_tire' ).hide();
			jQuery( '#wholesale_tire_price .wrap_' + variation_id ).show();

			jQuery( '#wholesale_tire_price > tbody  > tr' ).each(
				function(index, tr) {
					this_tr = jQuery( this );
					// console.log(index);
					id  = this_tr.data( 'id' );
					min = this_tr.data( 'min' );
					max = this_tr.data( 'max' );

					if (quantity >= min && quantity <= max) {
						jQuery( this_tr ).addClass( "active" );

					} else {
						jQuery( this_tr ).removeClass( "active" );
					}

				}
			);
}
