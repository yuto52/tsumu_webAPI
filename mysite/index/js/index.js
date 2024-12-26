let INCREASE_COIN = new Array(1024).fill(12);

function setIncreaseCoin() {
    const increaseSpecial = [0, 0, 0, 1, 2, 2, 2, 3, 3, 3, 5, 5, 5, 5, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
    for (let i = 0; i < increaseSpecial.length; i++) {
        INCREASE_COIN[i] = increaseSpecial[i];
    }
}

function calcOriginalCoin(chane) {
    let originalCoin = 0;
    for (let i = 0; i < chane; i++) {
        originalCoin += INCREASE_COIN[i];
    }
    return originalCoin;
}

function calcRevisedCoin(chane, revise) {
    let revisedCoin = 0;
    for (let i = 0; i < chane; i++) {
        if (i > 2) {
        revisedCoin += Math.max(INCREASE_COIN[i] + revise, 1);
        }
    }
    return revisedCoin;
}

function searchRevise(chane, getCoin) {
    const originalCoin = calcOriginalCoin(chane);
    if (getCoin === originalCoin) {
        return { revise: 0, message: "ジャスト！" };
    }
    let revise = 0, revisedCoin = 0;
    if (getCoin < originalCoin) {
        while (revise > -12) {
        revise--;
        revisedCoin = calcRevisedCoin(chane, revise);
            if (revisedCoin <= getCoin) {
                return { revise, message: revisedCoin === getCoin ? "ジャスト！" : "" };
            }
        }
        return { revise: -11, message: "" };
    } else {
        while (true) {
            revise++;
            revisedCoin = calcRevisedCoin(chane, revise);
            if (revisedCoin >= getCoin) {
                return { revise: revise - 1, message: revisedCoin === getCoin ? "ジャスト！" : "" };
            }
        }
    }
}

document.getElementById("calculateButton").addEventListener("click", () => {
    const chane = parseInt(document.getElementById("chane").value);
    const beforeCoin = parseInt(document.getElementById("beforeCoin").value);
    const afterCoin = parseInt(document.getElementById("afterCoin").value);

    if (isNaN(chane) || isNaN(beforeCoin) || isNaN(afterCoin)) {
        alert("すべてのフィールドを正しく入力してください。");
        return;
    }

    const getCoin = afterCoin - beforeCoin;
    const originalCoin = calcOriginalCoin(chane);
    const rate = (getCoin / originalCoin).toFixed(3);
    const { revise, message } = searchRevise(chane, getCoin);

    if (getCoin <= 0) {
        alert("消去前または消去後のコイン数を正しく入力してください");
        return;
    }

    document.getElementById("getCoin").textContent = `獲得コイン : ${getCoin}`;
    document.getElementById("rate").textContent = `コイン増加率 : ${rate}`;
    document.getElementById("revise").textContent = `コイン補正 : ${revise}`;
    document.getElementById("just").textContent = `${message}`;
});

setIncreaseCoin();
