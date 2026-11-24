console.log("dr.jsを読み込みました");

var company = "";

// 動きを抑える設定の場合、フェード演出を省略する
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    $.fx.off = true;
}


// ① LPを公開する
$("#publish").on("click", function () {
    console.log("LP公開ボタンをクリックしました");

    // 公開済みにして連打を防ぐ
    $("#publish")
        .prop("disabled", true)
        .text("公開しました");

    // CSSのクラスを付けて、LPの見た目を変える
    $("#preview").addClass("is-published");
    $("#preview-status").text("公開中");

    $("#status").text("共同LPを公開しました");
    $("#waiting-text").text("問い合わせを待っています");
    $("#waiting-dots").show();

    console.log("LPを公開。問い合わせを待ちます");

    // 2秒後に問い合わせが届く
    setTimeout(function () {

        var companyNumber = Math.floor(Math.random() * 3);
        console.log("企業の番号：", companyNumber);

        if (companyNumber === 0) {
            company = "株式会社グー";
        } else if (companyNumber === 1) {
            company = "株式会社チョキ";
        } else {
            company = "株式会社パー";
        }

        console.log("問い合わせ到着：", company);

        // 待機表示を消して、問い合わせを表示
        $("#waiting").hide();

        $("#company").text(company);
        $("#count").text("1件").addClass("has-inquiry");
        $("#inquiry").fadeIn(400);

        $("#status").text("共同LPから問い合わせが1件届きました");

    }, 2000);
});


// ② バッティングを確認する
$("#check").on("click", function () {
    console.log("バッティング確認を開始：", company);

    $("#check")
        .prop("disabled", true)
        .text("照合中…");

    // 動くバーを表示
    $("#checking").show();

    console.log("顧客情報を照合しています");

    // 1.5秒後に判定を表示
    setTimeout(function () {

        var approach = Math.floor(Math.random() * 2);
        console.log("判定の番号：", approach);

        $("#checking").hide();
        $("#check").text("照合完了");

        if (approach === 0) {

            $("#result").addClass("is-ok");
            $("#result-symbol").text("✓");
            $("#result-title").text("アプローチOK");
            $("#result-message").text(
                company + "への営業対応を進めてください。"
            );

            console.log("判定結果：アプローチOK");

        } else {

            $("#result").addClass("is-ng");
            $("#result-symbol").text("!");
            $("#result-title").text("アプローチNG");
            $("#result-message").text(
                "バッティングがあります。担当者へ確認してください。"
            );

            console.log("判定結果：アプローチNG");

        }

        $("#result").fadeIn(400);
        $("#reset").show();

    }, 1500);
});


// ③ 最初からやり直す
$("#reset").on("click", function () {
    console.log("リセットを開始します");

    company = "";

    // アニメーションを終了して各表示を隠す
    $("#inquiry, #result").stop(true, true).hide();
    $("#checking, #reset, #waiting-dots").hide();

    // 結果と公開状態のクラスを外す
    $("#result").removeClass("is-ok is-ng");
    $("#preview").removeClass("is-published");

    $("#preview-status").text("公開前");
    $("#count").text("0件").removeClass("has-inquiry");

    // ボタンを再び押せるようにする
    $("#publish")
        .prop("disabled", false)
        .html('LPを公開する <span>↗</span>');

    $("#check")
        .prop("disabled", false)
        .html('バッティングを確認する <span>→</span>');

    $("#status").text("公開の準備ができています");
    $("#waiting-text").text("まだ問い合わせはありません");
    $("#waiting").show();

    console.log("リセット完了");
});