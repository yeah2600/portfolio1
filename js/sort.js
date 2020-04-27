$(function(){

    $('#mainfile').addClass('none');
    $('.rankingdate').addClass('none');
    /*実装予定++++++++++++*/
    $('#exclusion').addClass('none');
    $('#back').addClass('none');
    /*+++++++++++++++++++*/

    $('#start-button').on('click', function(){
        $('#mainfile').removeClass('none');
        $('#start').addClass('none');
    });

        var n = 0;
        var i;
        var charaData = new Array();

        //'使用するデータの導入
        for(i in charas){
            if(charas[i].flag){
                charaData.push(charas[i]);
            }
        };
        $('#charalist').text(charaData.length)

        charaData.sort(function(){return Math.random()>0.5?-1:1});
        charaData.sort(function(){return Math.random()>0.5?-1:1});
        charaData.sort(function(){return Math.random()>0.5?-1:1});

        var listMenber;
        var totalSize;
        var parent = new Array();

        /*使用するデータからソートするデータに代入*/
        listMenber = new Array();
        listMenber[n] = new Array();
        for(i=0; i<charaData.length; i++){
            listMenber[n][i] = i;
        }
        parent[n] = -1;
        totalSize = 0;
        n++;

        /*要素数を２で割る*/
        for (i=0; i<listMenber.length; i++) {
            if(listMenber[i].length>=2) {
                mid = Math.ceil(listMenber[i].length/2);
                listMenber[n] = new Array();
                listMenber[n] = listMenber[i].slice(0,mid);
                totalSize += listMenber[n].length;
                parent[n] = i;
                n++;
                listMenber[n] = new Array();
                listMenber[n] = listMenber[i].slice(mid,listMenber[i].length);
                totalSize += listMenber[n].length;
                parent[n] = i;
                n++;
            }
        }

        /*保存用の配列*/
        var rec = new Array(charaData.length);
        var nrec;
        rec = rec.fill(0)
        nrec = 0;

        /*引き分けの結果を保存するリスト*/
        var draw = new Array(charaData.length);
        draw = draw.fill(-1)

        /*
        cmp:キャラマップ
        head:マップパス
        */
        arrayNum1 = listMenber.length-2;
        arrayNum2 = listMenber.length-1;
        head1 = 0;
        head2 = 0;
        numQuestion = 1;
        finishSize = 0;

        battleImage();

        /*発火リストの作成*/
        $('#leftimg').on('click', function(){
            sortList(-1);
        });
        $('#rightimg').on('click', function(){
            sortList(1);
        });
        $('#draw').on('click', function(){
            sortList(0);
        });
        /* sortList未定義につき、コメントアウト中（追加したい要素）
        $('#exclusion').on('click', function(){
            sortList(5);
        });
        $('#back').on('click', function(){
            sortList(-5);
        });
        */

    /*リストをソートする定義*/
    /*push：発火リストの結果
        -1：左を選択
         1：右を選択
         0：引き分け
    */
    function sortList(push){
        /*cmpが-1になった時のエラー回避コード*/
        switch(arrayNum1){
            case 0:
                break;
            case -1:
                battleResult(); 
        }

        if(push==-1){
            rec[nrec] = listMenber[arrayNum1][head1];
            head1++;
            nrec++;
            finishSize++;
            while (draw[rec[nrec-1]]!=-1) {
                rec[nrec] = listMenber[arrayNum1][head1];
                head1++;
                nrec++;
                finishSize++;
            }
        }
        else if(push==1){
            rec[nrec] = listMenber[arrayNum2][head2];
            head2++;
            nrec++;
            finishSize++;
            while (draw[rec[nrec-1]]!=-1) {
                rec[nrec] = listMenber[arrayNum2][head2];
                head2++;
                nrec++;
                finishSize++;
            }
        }
        else{
            rec[nrec] = listMenber[arrayNum1][head1];
            head1++;
            nrec++;
            finishSize++;
            while (draw[rec[nrec-1]]!=-1) {
                rec[nrec] = listMenber[arrayNum1][head1];
                head1++;
                nrec++;
                finishSize++;
            }
            draw[rec[nrec-1]] = listMenber[arrayNum2][head2];
            rec[nrec] = listMenber[arrayNum2][head2];
            head2++;
            nrec++;
            finishSize++;
            while (draw[rec[nrec-1]]!=-1) {
                rec[nrec] = listMenber[arrayNum2][head2];
                head2++;
                nrec++;
                finishSize++;
            }
        }

        if(head1<listMenber[arrayNum1].length && head2==listMenber[arrayNum2].length){
            while(head1<listMenber[arrayNum1].length){
                rec[nrec] = listMenber[arrayNum1][head1];
                head1++;
                nrec++;
                finishSize++;
            }
        }
        else if(head1==listMenber[arrayNum1].length && head2<listMenber[arrayNum2].length){
            while(head2<listMenber[arrayNum2].length){
                rec[nrec] = listMenber[arrayNum2][head2];
                head2++;
                nrec++;
                finishSize++;
            }
        }

        if(head1==listMenber[arrayNum1].length && head2==listMenber[arrayNum2].length){
            for(let i=0; i<listMenber[arrayNum1].length+listMenber[arrayNum2].length; i++){
                listMenber[parent[arrayNum1]][i] = rec[i];
            }
            listMenber.pop();
            listMenber.pop();
            arrayNum1 = arrayNum1-2;
            arrayNum2 = arrayNum2-2;
            head1 = 0;
            head2 = 0;

            if(head1==0 && head2==0){
                rec = new Array(charaData.length);
                rec = rec.fill(0)
                nrec = 0;
            }
        }
        
        if(arrayNum1<0){
            let count = numQuestion-1;
            let progress = Math.floor(finishSize*100/totalSize);
            $('#count').text(count);
            $('#progress').text(progress + "%");
            $('#progressbar').attr('value',progress);

            finishSize = 1;
            battleResult();
        }
        else{
            battleImage();
        }
    }

    /*ソートした結果の表示*/
    function battleResult(){
        $('.rankingdate').removeClass('none');
        $('#start').removeClass('none').append($('<a>').attr('href','#ranking').text("結果をチェック！"));
        $('#imgdata').addClass('none');
        $('.sortcontent').addClass('none');
        $('#start-button').addClass('none');

        var tweetText = "";

        for(i=0; i<listMenber[0].length; i++){
            var listNo = listMenber[0][i]
            var rankFlex = $('<div>').addClass('rankingflex');
            var noList = $('<p>').addClass('nolist').text((i+1) + '位');
            var list = $('<p>').attr('id', 'no' + (i+1)).addClass('liststyle').text(charaData[listNo]['name']);
            $('#ranking').append(rankFlex.append(noList).append(list));

            /*ツイートエリアの設定*/
            if(i<10){
                tweetText += ((i + 1) + "位:" + charaData[listNo]['name']+"%0a");
            }
        }
        tweetText = "あなたのプリコネキャラソートTOP10！%0a"+tweetText+"%23プリコネキャラソート%0a";
        
        let url = document.location.href;
        $('#tweet-style').on('click', function(){
            url = "http://twitter.com/share?url=" + escape(url) + "&text=" + tweetText;
            window.open(url,"_blank","width=600,height=300");
        });
    }

    /*ソートするリストから画像と名前を表示*/
    function battleImage(){
        let count = numQuestion;
        let progress = Math.floor(finishSize*100/totalSize);
        let leftCharaPath = listMenber[arrayNum1][head1];
        let rightCharaPath = listMenber[arrayNum2][head2];
        $('#count').text(count);
        $('#progress').text(progress + "%");
        $('#leftimg img').attr('src',charaData[leftCharaPath]['img']);
        $('#rightimg img').attr('src',charaData[rightCharaPath]['img']);
        $('#leftname').text(charaData[leftCharaPath]['name']);
        $('#rightname').text(charaData[rightCharaPath]['name']);
        $('#progressbar').attr('value',progress);
        numQuestion++;
    }

    //'subcontentsの設定
    $('#descripion-button').on('click', function(){
        if ($('#descripion').is(':hidden')) {
            $('#descripion').slideDown('slow');
        } else {
            $('#descripion').slideUp('slow');
        }
    });

});
