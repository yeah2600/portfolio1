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
        var rec = new Array();
        var nrec;
        for (i=0; i<charaData.length; i++) {
            rec[i] = 0;
        }
        nrec = 0;

        /*引き分けの結果を保存するリスト*/
        var equal = new Array();
        for (i=0; i<=charaData.length; i++) {
            equal[i] = -1;
        }

        /*
        cmp:キャラマップ
        head:マップパス
        */
        cmp1 = listMenber.length-2;
        cmp2 = listMenber.length-1;
        head1 = 0;
        head2 = 0;
        numQuestion = 1;
        finishSize = 0;
        finishFlag = 0;

        battleImage();

        /*発火リストの作成*/
        $('#leftimg').on('click', function(){
            sortlist(-1);
        });
        $('#rightimg').on('click', function(){
            sortlist(1);
        });
        $('#draw').on('click', function(){
            sortlist(0);
        });
        /* sortList未定義につき、コメントアウト中（追加したい要素）
        $('#exclusion').on('click', function(){
            sortlist(5);
        });
        $('#back').on('click', function(){
            sortlist(-5);
        });
        */

    /*リストをソートする定義*/
    /*flag：発火リストの結果
        -1：左を選択
         1：右を選択
         0：引き分け
    */
    function sortlist(flag){
        /*cmpが-1になった時のエラー回避コード*/
        switch(cmp1){
            case 0:
                break;
            case -1:
                battleResult(); 
        }

        if(flag==-1){
            rec[nrec] = listMenber[cmp1][head1];
            head1++;
            nrec++;
            finishSize++;
            while (equal[rec[nrec-1]]!=-1) {
                rec[nrec] = listMenber[cmp1][head1];
                head1++;
                nrec++;
                finishSize++;
            }
        }
        else if(flag==1){
            rec[nrec] = listMenber[cmp2][head2];
            head2++;
            nrec++;
            finishSize++;
            while (equal[rec[nrec-1]]!=-1) {
                rec[nrec] = listMenber[cmp2][head2];
                head2++;
                nrec++;
                finishSize++;
            }
        }
        else{
            rec[nrec] = listMenber[cmp1][head1];
            head1++;
            nrec++;
            finishSize++;
            while (equal[rec[nrec-1]]!=-1) {
                rec[nrec] = listMenber[cmp1][head1];
                head1++;
                nrec++;
                finishSize++;
            }
            equal[rec[nrec-1]] = listMenber[cmp2][head2];
            rec[nrec] = listMenber[cmp2][head2];
            head2++;
            nrec++;
            finishSize++;
            while (equal[rec[nrec-1]]!=-1) {
                rec[nrec] = listMenber[cmp2][head2];
                head2++;
                nrec++;
                finishSize++;
            }
        }

        if(head1<listMenber[cmp1].length && head2==listMenber[cmp2].length){
            while(head1<listMenber[cmp1].length){
                rec[nrec] = listMenber[cmp1][head1];
                head1++;
                nrec++;
                finishSize++;
            }
        }
        else if(head1==listMenber[cmp1].length && head2<listMenber[cmp2].length){
            while(head2<listMenber[cmp2].length){
                rec[nrec] = listMenber[cmp2][head2];
                head2++;
                nrec++;
                finishSize++;
            }
        }

        if(head1==listMenber[cmp1].length && head2==listMenber[cmp2].length){
            for(let i=0; i<listMenber[cmp1].length+listMenber[cmp2].length; i++){
                listMenber[parent[cmp1]][i] = rec[i];
            }
            listMenber.pop();
            listMenber.pop();
            cmp1 = cmp1-2;
            cmp2 = cmp2-2;
            head1 = 0;
            head2 = 0;

            if(head1==0 && head2==0){
                for(let i=0; i<charaData.length; i++){
                    rec[i] = 0;
                }
                nrec = 0;
            }
        }
        
        if(cmp1<0){
            let str1 = numQuestion-1;
            let str2 = Math.floor(finishSize*100/totalSize)+"%";
            $('#count').text(str1);
            $('#progress').text(str2);

            battleResult();
            finishSize = 1;
        }
        else{
            battleImage();
        }
    }

    /*ソートした結果の表示*/
    function battleResult(){
        $('.rankingdate').removeClass('none');
        $('#start').removeClass('none').append($('<a>').attr('href','#ranking').text("↓↓↓ 結果をチェック！ ↓↓↓"));
        $('#imgdata').addClass('none');
        $('.sortcontent').addClass('none');
        $('#start-button').addClass('none');
        

        for(i=0; i<listMenber[0].length; i++){
            var listNo = listMenber[0][i]
            var rankFlex = $('<div>').addClass('rankingflex');
            var noList = $('<p>').addClass('nolist').text((i+1) + '位');
            var list = $('<p>').attr('id', 'no' + (i+1)).addClass('liststyle').text(charaData[listNo]['name']);

            $('#ranking').append(rankFlex.append(noList).append(list));
        }
    }

    /*ソートするリストから画像と名前を表示*/
    function battleImage(){
        let count = numQuestion;
        let progress = Math.floor(finishSize*100/totalSize)+"%";
        let leftCharaPath = listMenber[cmp1][head1];
        let rightCharaPath = listMenber[cmp2][head2];
        $('#count').text(count);
        $('#progress').text(progress);
        $('#leftimg img').attr('src',charaData[leftCharaPath]['img']);
        $('#rightimg img').attr('src',charaData[rightCharaPath]['img']);
        $('#leftname').text(charaData[leftCharaPath]['name']);
        $('#rightname').text(charaData[rightCharaPath]['name']);
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
