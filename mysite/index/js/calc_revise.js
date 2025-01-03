let INCREASE_COIN = new Array(1024).fill(12); // 消去数ごとに増えるコイン数

// 消去数ごとに増えるコイン数を設定（サイトロード時に実行）
function setIncreaseCoin() {
    const increaseSpecial = [0, 0, 0, 1, 2, 2, 2, 3, 3, 3, 5, 5, 5, 5, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
    for (let i = 0; i < increaseSpecial.length; i++) {
        INCREASE_COIN[i] = increaseSpecial[i];
    }
}

// コイン補正無しの獲得コイン数を計算
function calcOriginalCoin(chane) {
    let originalCoin = 0;
    for (let i = 0; i < chane; i++) {
        originalCoin += INCREASE_COIN[i];
    }
    return originalCoin;
}

// コイン補正ありの獲得コイン数を計算
function calcRevisedCoin(chane, revise) {
    let revisedCoin = 0;
    for (let i = 0; i < chane; i++) {
        if (i > 2) {
        revisedCoin += Math.max(INCREASE_COIN[i] + revise, 1);
        }
    }
    return revisedCoin;
}

// コイン補正を探索
function searchRevise(chane, getCoin) {
    const originalCoin = calcOriginalCoin(chane);
    // コイン補正無し、誤差0の場合
    if (getCoin === originalCoin) {
        return { revise: 0, message: "ジャスト！" };
    }

    let revise = 0, revisedCoin = 0;
    // コイン補正がマイナスの場合
    if (getCoin < originalCoin) {
        while (revise > -12) {
        revise--;
        revisedCoin = calcRevisedCoin(chane, revise);
            // 補正後のコイン数が獲得コイン数以下になった場合
            if (revisedCoin <= getCoin) {
                return { revise, message: revisedCoin === getCoin ? "ジャスト！" : "" };
            }
        }
        return { revise: -11, message: "" };

    // コイン補正がプラスの場合
    } else {
        while (true) {
            revise++;
            revisedCoin = calcRevisedCoin(chane, revise);
            // 補正後のコイン数が獲得コイン数以上になった場合
            if (revisedCoin >= getCoin) {
                return { revise: revise - 1, message: revisedCoin === getCoin ? "ジャスト！" : "" };
            }
        }
    }
}

// 計算ボタン押下時の処理
document.getElementById("calculateButton").addEventListener("click", () => {
    const chane = parseInt(document.getElementById("chane").value);
    const beforeCoin = parseInt(document.getElementById("beforeCoin").value);
    const afterCoin = parseInt(document.getElementById("afterCoin").value);

    if (isNaN(chane) || isNaN(beforeCoin) || isNaN(afterCoin)) {
        alert("すべてのフィールドを正しく入力してください。");
        return;
    }
    if (chane < 4 || chane > 1000000) {
        alert("消去数は4以上1000000以下の値を入力してください");
        return;
    }
    if (beforeCoin < 0 || beforeCoin > 100000000) {
        alert("消去前のコイン数は0以上100000000以下の値を入力してください");
        return;
    }
    if (afterCoin < 0 || afterCoin > 100000000) {
        alert("消去後のコイン数は0以上100000000以下の値を入力してください");
        return;
    }

    const getCoin = afterCoin - beforeCoin;
    if (getCoin <= 0) {
        alert("消去前または消去後のコイン数を正しく入力してください");
        return;
    }
    const originalCoin = calcOriginalCoin(chane);
    const rate = (getCoin / originalCoin).toFixed(3);
    const { revise, message } = searchRevise(chane, getCoin);

    document.getElementById("getCoin").textContent = `獲得コイン : ${getCoin}`;
    document.getElementById("rate").textContent = `コイン増加率 : ${rate}`;
    document.getElementById("revise").textContent = `コイン補正 : ${revise}`;
    document.getElementById("just").textContent = `${message}`;
});

setIncreaseCoin();
