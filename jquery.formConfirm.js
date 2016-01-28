/* *******************************************
	jquery.formConfirm 1.0.0

	The MIT License (MIT)
	Copyright (c) 2016 MaedaTakuya

	https://github.com/MaedaTakuya
******************************************* */

(function($) {
	$.fn.formConfirm = function(options) {

		/* *******************************************
			'プラグイン呼び出し時に引数で上書き可能なオプション' : 'デフォルト値'
			resetText  => resetボタンに表示するテキスト
			submitText => submitボタンに表示するテキスト
		******************************************* */
		var opt = $.extend( {
		'resetText'  : '修正する',
		'submitText' : '送信する'
		}, options);



		this.submit(function () {
			/* *******************************************
				オリジナルのフォームをコピー
				ラジオボタンのチェックの有無を取得
				チェックボックスのチェックの有無を取得
				セレクトボックスのselectedの位置を取得
			******************************************* */
			var originalForm = $(this);
			var radioBool = [];
			$("input[type='radio']",originalForm).each(function(i, elem) {
				radioBool.push($(elem).prop('checked'));
			});
			var checkboxBool = [];
			$("input[type='checkbox']",originalForm).each(function(i, elem) {
				checkboxBool.push($(elem).prop('checked'));
			});
			var originalSelect = $("select",originalForm);
			var optionIndex = [];
			$(originalSelect).each(function(i, elem) {
				optionIndex.push(($(originalSelect[i]).prop("selectedIndex")));
			});



			/* *******************************************
				確認画面用にオリジナルのフォームをクローン（確認画面ではフォーム内容の編集不可）
				フォームの要素にreadonly属性をセット(radio/checkbox/hiddenは除く)
				ラジオボタンにchecked/disabledをセット
				チェックボックスにchecked/disabled/onclick="return false;"をセット
				セレクトボックスにselected/disabledをセット
			******************************************* */
			var cloneForm = originalForm.clone();
			$("input[type!='radio'][type!='checkbox'][type!='hidden'],textarea",cloneForm).each(function(i, elem) {
				$(elem).attr("readonly","readonly");
			});
			$("input[type='radio']",cloneForm).each(function(i, elem) {
				if(radioBool[i]){
					$(elem).removeAttr("disabled").attr("checked","checked");
				}else{
					$(elem).removeAttr("checked").attr("disabled","disabled");
				}
			});
			$("input[type='checkbox']",cloneForm).each(function(i, elem) {
				if(checkboxBool[i]){
					$(elem).removeAttr("disabled").attr("checked","checked").attr("onclick","return false;");
				}else{
					$(elem).removeAttr("checked").attr("disabled","disabled");
				}
			});
			$("select",cloneForm).each(function(i, elem) {
				$("option",elem).removeAttr("selected").attr("disabled","disabled");
				$("option",elem).eq(optionIndex[i]).removeAttr("disabled").attr("selected","selected");
			});
			$("button[type='reset']",cloneForm).text(opt.resetText).on('click', function() {
				$(".confirmView").remove();
				return false;
			});
			$("button[type='submit']",cloneForm).text(opt.submitText);



			/* *******************************************
				確認画面を表示
				デフォルトのsubmitイベントを中止
			******************************************* */
			originalForm.after(cloneForm);
			cloneForm.wrap("<div class='confirmView'></div>");
			return false;
		});


		return this;
	};
})(jQuery);
