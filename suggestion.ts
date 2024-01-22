var suggestionProsessing = false;
async function suggestionButton() {
    if (suggestionProsessing) {
        console.log("実行中！")
        return
    }
    try {
        suggestionProsessing = true
        var suggestionElement = document.getElementById("suggestionElements");
        changetab("suggestion")
        document.querySelectorAll(".suggestElement").forEach(function (table) {
            table.remove();
        });
        var measreresults = []
        // var rundam
        var count = 0
        for (const colorObject of shuffleArray(colorObjects)) {
            count += 1
            console.log(count / colorObjects.length * 100)
            document.getElementById("suggestionProgress").innerText = `提案${Math.round(count / colorObjects.length * 100)}%`;
            // const currentColorObject = colorObject;
            // console.log("dis", suggestionElement.style.display)
            if (document.getElementById("suggestion").style.display == "none") { console.log("おわり"); break; }

            const candidateHVC = { H: colorObject[2][0], V: colorObject[2][1], C: colorObject[2][1] };

            const candidateColor = colorObject[1];
            console.log(candidateColor, candidateHVC);

            const measreresult = await colorHarmonyCalculate([{ color: candidateColor, HVC: candidateHVC }]);
            console.log("measre", measreresult);
            console.log(suggestionElement.style.display);

            const newDiv = document.createElement("div");

            // 新しい div 要素に内容を追加
            newDiv.innerHTML = `
        <table class="suggestElement">
            <tr>
                <td>
                    <button type="button" class="btn" onclick="tableHide(this)" style="background-color:${candidateColor};">　　</button>
                </td>
                <td>
                    <div class="orderview display-6">${measreresult > 0 ? '+' : ''}${measreresult.toFixed(3)}</div>
                </td>
            </tr>
        </table>
    `;

            // 新しい div 要素を suggestionElement に追加

            for (let i = 0; i < measreresults.length; i++) {
                if (measreresults[i] < measreresult) {
                    measreresults.splice(i, 0, measreresult);

                    // 新しい要素を作成

                    // 新しい要素の内容や属性の設定

                    // 親要素のN番目に要素を挿入
                    suggestionElement.insertBefore(newDiv, suggestionElement.children[i]);
                    break;  // 挿入後にループを終了
                }
            }

            // 値が既存のすべての値よりも大きい場合、配列の末尾に追加する必要があります
            if (measreresults.indexOf(measreresult) === -1) {
                measreresults.push(measreresult);

                // 新しい要素を作成

                // 新しい要素の内容や属性の設定

                // 親要素の末尾に要素を挿入
                suggestionElement.appendChild(newDiv);
            }

            // console.log("measreresults", measreresults);

        }
    } catch (error) {
        // 何らかのエラーが発生した場合の処理
        console.error("エラーが発生しました:", error);
    } finally {
        // このブロックのコードは、try ブロックが正常に終了またはエラーで終了した場合に実行されます
        // console.log("finally ブロックが実行されました。");
        suggestionProsessing = false
    }
}

function shuffleArray(array) {
    const cloneArray = [...array]

    for (let i = cloneArray.length - 1; i >= 0; i--) {
        let rand = Math.floor(Math.random() * (i + 1))
        // 配列の要素の順番を入れ替える
        let tmpStorage = cloneArray[i]
        cloneArray[i] = cloneArray[rand]
        cloneArray[rand] = tmpStorage
    }

    return cloneArray
}