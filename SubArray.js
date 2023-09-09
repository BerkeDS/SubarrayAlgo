
/*

----------------------------------ALT KÜME ALGORİTMASI-------------


*/

const sabitAr = ['a','b','c',"g","f","e","j","k","z","x","v","b","n","m","ö","ç",".",",","1"]
const sabitAr1 = ['a','b','c','d','e'];
console.log(subArray(sabitAr1));
//console.log(subSett(sabitAr));

//#region ÇÖZÜM 1 Kendi bulduğum yöntem -- Alt kümeler arasındaki ilişkiden yararlanarak bulma
/*
    -----AÇIKLAMA
        a = [a,b,c,d] | n = 4 eleman sayısı | 2**n alt küme sayısı 2 üzeri n
        a kümesinin alt kümeleri
        boş küme   = [] = 1
        1 elemanlı = [a,b,c,d] = 4
        2 elemanlı = [ab,ac,ad,bc,bd,cd] = 6
        3 elemanlı = [abc,abd,acd,bcd] = 4
        4 elemanlı = [abcd] = 1
        .
        .
        .
        n elemanlıya kadar
        
        1 elemanlı alt küme oluşturarak başla
        2 elemanlı alt kümeleri bulurken kendinden önceki alt kümede(1 elemanlı) kendisinin bulunduğu elemanlar hariç diğer alt küme elemanlarını yanına ekliyor, örneğin a elemanı için konuşursak, 1 elemanlı kümede a hariç yani kendisi b,c,d var, bunları a ya eklersek ab,ac,ad olur, daha sonra 2. elemana geçilir ve b 1 elemanlı alt kümede kendinden sonraki tüm alt küme elemanlarını yanına ekler, bc,bd. bu şekilde son elemana kadar gider.

        Bu ilişki ardışık elemanlı alt kümeler için geçerlidir. 1 ve 2 elemanlı 2 ve 3 elemanlı yani 1 elemanlıdan başalayarak n elemanlıya kadar uygulayabiliriz.
*/



function subArray(arr) {
    let subAr =[];
    let sumAr =[];
    //#region TEK ELEMANLI ALT KÜMELER
    for (let i = 0; i < arr.length; i++) {
        sumAr.push(arr[i] + "" /* "" <-- birleştirme veya toplama */);
    }
    subAr.push(sumAr);
    sumAr = [];
    //#endregion
    
    
    let altKumeEl=1;
    for (let l = 0; l < subAr[0].length-2; l++) {
        for (let i = 0; i < subAr[0].length-altKumeEl; i++) {
            let holder1 = 0;
            let holder2 = 0;
            
            holder1 = subAr[0].length-(i+1);
            holder2 = factorial(holder1)/ (factorial(holder1-altKumeEl) * factorial(altKumeEl));            
            let sum = subAr[l].length - holder2;

            for (let j = sum; j < subAr[l].length; j++) {
                sumAr.push(subAr[0][i]+subAr[l][j])
                
            }
//#region MANUEL
    //---------------------------------------------------------------------------------
            /*sumAr.push(subAr[0][0]+subAr[0][1])
            sumAr.push(subAr[0][0]+subAr[0][2])
            sumAr.push(subAr[0][0]+subAr[0][3])
            sumAr.push(subAr[0][0]+subAr[0][4])
    
            sumAr.push(subAr[0][1]+subAr[0][2])
            sumAr.push(subAr[0][1]+subAr[0][3])
            sumAr.push(subAr[0][1]+subAr[0][4])
    
            sumAr.push(subAr[0][2]+subAr[0][3])
            sumAr.push(subAr[0][2]+subAr[0][4])
    
            sumAr.push(subAr[0][3]+subAr[0][4])*/
    /*-----------------------------------------------------------*/
           /* subAr.push(sumAr);
            sumAr =[];
    
    //-----------------------------------------------------
    
            sumAr.push(subAr[0][0]+subAr[1][4])
            sumAr.push(subAr[0][0]+subAr[1][5])
            sumAr.push(subAr[0][0]+subAr[1][6])
            sumAr.push(subAr[0][0]+subAr[1][7])
            sumAr.push(subAr[0][0]+subAr[1][8])
            sumAr.push(subAr[0][0]+subAr[1][9])
    
            sumAr.push(subAr[0][1]+subAr[1][7])
            sumAr.push(subAr[0][1]+subAr[1][8])
            sumAr.push(subAr[0][1]+subAr[1][9])
    
            sumAr.push(subAr[0][2]+subAr[1][9])*/
    
    /*-----------------------------------------------------------*/
       /* subAr.push(sumAr);
        sumAr =[];
    
    //-----------------------------------------------------
    
            sumAr.push(subAr[0][0] + subAr[2][6])
            sumAr.push(subAr[0][0] + subAr[2][7])
            sumAr.push(subAr[0][0] + subAr[2][8])
            sumAr.push(subAr[0][0] + subAr[2][9])
    
            sumAr.push(subAr[0][1] + subAr[2][9])*/
    /*-----------------------------------------------------------*/
       // subAr.push(sumAr);
       // sumAr =[];
    
    //-----------------------------------------------------
    //#endregion
        }
        subAr.push(sumAr);
        sumAr =[];
        altKumeEl++;
    }
    
    //#region SON ALT KÜME    
    let lastSub = "";
    for (let i = 0; i < subAr[0].length; i++) {
        lastSub = lastSub + subAr[0][i];
    }
    sumAr.push(lastSub);
    subAr.push(sumAr);
    sumAr = [];
    //#endregion
    
    return subAr;
}

function factorial(n){
    if(n == 0 || n == 1){
    return 1;
    }
    else{
        return n * factorial(n-1);
    }
}

//#endregion

//#region ÇÖZÜM 2 Binary sistemi kullanarak

/*
    ------------------AÇIKLAMA--------
    bir kümenin alt küme sayısı 2 üzeri eleman sayısı kadardır.
    a = [a,b,c]; n = 3 ; 2**3 = 8; 8 alt küme var

    8 e kadar olan sayıları 2 li sisteme çevirirsek ve boyutu eleman sayısına sabitlersek yani 3'e bize tüm olasılıkları vermiş olur. her adımda 2 li sayı sisteminde 1 gördüğümüz yerdeki elemanı alırsak

    0 = 000 = [] = boş küme
    1 = 001 = [c]
    2 = 010 = [b]
    3 = 011 = [bc]
    4 = 100 = [a]
    5 = 101 = [ac]
    6 = 110 = [ab]
    7 = 111 = [abc]

*/

function subSett(arr)
{
    let n = arr.length;
    let el= "";
    let ss = [];
    for (let i = 0; i < Math.pow(2,n); i++) {
        let bin = i.toString(2).padStart(n,0);
        for(let j = 0; j <n; j++)
        {
            if (bin[j] == '1') {
                el = el + arr[j];
            }
        }
        ss.push(el);
        el="";
    }
    return ss;

}
//#endregion

// ÇÖZÜM 3 boş kümeden başla elemanın kendisini ekle ve kendinden önceki tüm alt kümeleri ekle
/*
a,b,c

[]
a
b
ab
c
ac
bc
abc
*/
