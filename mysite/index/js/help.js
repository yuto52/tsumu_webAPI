document.addEventListener("DOMContentLoaded", () => {
    const helpButton = document.getElementById("helpButton");
    const popup = document.getElementById("popup");
    const closePopup = document.getElementById("closePopup");

    // ヘルプボタンをクリックしたときにポップアップを表示
    helpButton.addEventListener("click", () => {
        popup.style.display = "flex";
    });

    // 閉じるボタンをクリックしたときにポップアップを非表示
    closePopup.addEventListener("click", () => {
        popup.style.display = "none";
    });

    // ポップアップの外側をクリックしても閉じる
    popup.addEventListener("click", (e) => {
        if (e.target === popup) {
            popup.style.display = "none";
        }
    });
});
