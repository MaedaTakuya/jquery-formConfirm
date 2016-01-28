#jquery-formConfirm

Form内容確認用のjQueryプラグインです。  
Form内容をサーバーに送る前に、クライアント側で確認画面を表示したく作成いたしました。

##Licenseについて
このプラグインはMITライセンスです。  
ソースコード内の著作権表示を残して頂ければ、個人・商用問わずご自由にご利用頂けます。

*This software is released under the MIT License, see LICENSE.md.*

##使い方
* jQuery本体と、[jquery.formConfirm.js]を読み込みます。
* 要素をセレクタで指定して実行  
  下記はformにclass="js-formConfirm"を指定し、クラスセレクタで実行した場合。
```
$(function() {
  $('.js-formConfirm').formConfirm();
});
```
* オプションの指定は下記になります。  
デフォルト値はそれぞれ'resetText'=>'修正する','submitText'=>'送信する'です。
```
$(function() {
  $('.js-formConfirm').formConfirm({
    'resetText'  : '確認画面のリセットボタンに表示するテキスト',
    'submitText' : '確認画面のサブミットボタンに表示するテキスト'
  });
});
```
* CSSに関しては、[formConfirm.css]に最低限のスタイルを記述していますが、適宜ご準備ください。  
  また、[example.html]ではbootstrapを使用していますが、必須ではありません。


##注意事項
formのクローンを作成し、確認画面に表示させる仕様となっており、  
form内にリセットボタンとサブミットボタンがない場合上手く動作しません。