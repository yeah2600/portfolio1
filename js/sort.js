$(function(){

    $('#imgdata').addClass('none');
    $('.sortcontent').addClass('none');


    $('#start-button').on('click', function(){
        $('#imgdata').removeClass('none');
        $('.sortcontent').removeClass('none');
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

        charaData.sort(function(){return Math.random()>0.5?-1:1});
        charaData.sort(function(){return Math.random()>0.5?-1:1});
        charaData.sort(function(){return Math.random()>0.5?-1:1});

        var listMenber;
        var totalSize;
        var parent = new Array();

        listMenber = new Array();
        listMenber[n] = new Array();
        for(i=0; i<charaData.length; i++){
            listMenber[n][i] = i;
        }
        parent[n] = -1;
        totalSize = 0;
        n++;

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

        var rec = new Array();
        var nrec;
        for (i=0; i<charaData.length; i++) {
            rec[i] = 0;
        }
        nrec = 0;

        var equal = new Array();
        for (i=0; i<=charaData.length; i++) {
            equal[i] = -1;
        }

        cmp1 = listMenber.length-2;
        cmp2 = listMenber.length-1;
        head1 = 0;
        head2 = 0;
        numQuestion = 1;
        finishSize = 0;
        finishFlag = 0;

        battleImage();

        $('#leftimg').on('click', function(){
            sortlist(-1);
        });
        $('#rightimg').on('click', function(){
            sortlist(1);
        });
        $('#draw').on('click', function(){
            sortlist(0);
        });
        $('exclusion').on('click', function(){
            sortlist(5);
        });


    function sortlist(flag){

        if(flag===1){
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
        //'改良点有(画像が切り替わらない)----------
        else if(flag===-1){
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
        //'ここまで----------
        else if(flag===0){
            rec[nrec] = listMenber[cmp1][head1];
            head1++;
            nrec++;
            finishSize++;
            while (equal[rec[nrec-1]]!=-1) {
                rec[nrec] = listMenber[cmp2][head2];
                head2++;
                nrec++;
                finishSize++;
            }
        }

        if(head1<listMenber[cmp1].length && head2<listMenber[cmp2].length){
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
            battleImage();
            finishSize = 1;
        }
        else{
            battleImage();
        }
    }

    function battleResult(){
        var str = "<input type='button' onclick='initialList()' value='リスタート' />"
        $('#reStart').text(str)
    }

    function battleImage(){
        let str0 = numQuestion-1;
        let str1 = Math.floor(finishSize*100/totalSize)+"%";
        let str2 = listMenber[cmp1][head1];
        let str3 = listMenber[cmp2][head2];
        $('#count').text(str0);
        $('#progress').text(str1);
        $('#leftimg img').attr('src',charaData[str2]['img']);
        $('#rightimg img').attr('src',charaData[str3]['img']);
        $('#leftname').text(charaData[str2]['name']);
        $('#rightname').text(charaData[str3]['name']);
    }

    console.log(listMenber)


    //'subcontentsの設定
    $('#descripion-button').on('click', function(){
        if ($('#descripion').is(':hidden')) {
            $('#descripion').slideDown('slow');
        } else {
            $('#descripion').slideUp('slow');
        }

    });
});
