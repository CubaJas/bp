<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("Главная страница");
$APPLICATION->SetPageProperty("page_type", "main");
?>
    <div class="vue-component" data-component="Input"
         data-initial='{
            "label": "Сколько Вам лет?",
            "type": "number",
            "value": "100",
            "placeholder": "Введите число"
         }'></div>
    <div class="vue-component" data-component="Input"
         data-initial='{
            "label": "Введите имя",
            "type": "text",
            "value": "",
            "placeholder": "Text to me"
         }'></div>
    <div class="vue-component" data-component="Input"
         data-initial='{
            "label": "Введите пароль",
            "type": "password",
            "value": "",
            "placeholder": ""
         }'></div>
    <div class="vue-component" data-component="Button"
         data-initial='{
            "buttonText": "Click me"
         }'></div>


<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>