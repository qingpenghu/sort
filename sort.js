$(function(){
	function compareSize(array) {
		
		var newBrr=[],brrColor=[],pxColor=[],pxObj=[];
		
		for(var i=0; i<array.length; i++) { // 取出牌数和牌的花型
			var pxBrr = parseInt( array[i].toString().slice(2,array[i].length));
			var pxCol = parseInt(array[i].toString().slice(0,1));
			brrColor.push( pxCol );//牌的花型
			newBrr.push( pxBrr )//牌数
			
			var pxObj={pxBrr:pxBrr,pxCol:pxCol}
			pxColor.push(pxObj)
		}
//		console.log(pxColor)
		if ( equallyColors(brrColor,array).flag ) {	
			var arr = equallyColors(brrColor,array).colorPai;//同花的牌型的数组
			var color = equallyColors(brrColor,array).color;//同花的颜色的数组
			arr = arr.sort(function(a,b) {return a-b})
			var pos = straight(arr) // 同花顺的开始数
			var len = arr.length; //同花的个数
			console.log(pos)
			if (pos != 0) {
				if (pos == 13) { //pos=13 皇家同花顺
					var royalFlush = [14,13,12,11,10];
//					royalFlush = colorMatching(pxColor,royalFlush);
//					console.log(royalFlush)
					return {px:royalFlush,color:color,size:10,name:"皇家同花顺"}
				}else{
					if( pos == 1 ) {
						var straightFlush = [14,2,3,4,5];
//						straightFlush = colorMatching(pxColor,straightFlush);
						return {px:straightFlush,color:color,size:9,name:"同花顺"}
					}else {
						var straightFlush = [pos,pos+1,pos+2,pos+3,pos+4];
//						straightFlush = colorMatching(pxColor,straightFlush);
						return {px:straightFlush,color:color,size:9,name:"同花顺"}
					}
					
				}
			}else{
				if( arr[0] == 1 ) {
					var flush = [arr[0],arr[len-1],arr[len-2],arr[len-3],arr[len-4]];
					flush = colorMatching(pxColor,flush);
					return {px:flush,color:color,size:6,name:"同花"}
				}else {
					var flush = [arr[len-1],arr[len-2],arr[len-3],arr[len-4],arr[len-5]];
					flush = colorMatching(pxColor,flush);
					return {px:flush,color:color,size:6,name:"同花"}
				}	
			}	
		}else {
			console.log("不是同花") 
			var arr = newBrr
			var four = 0, three = 0, pair = 0, highCardArr=[], highCard=0;
			arr = arr.sort(function(a,b) {return a-b}) // 从小到大排序	
			
			var length = arr.length;
			console.log(arr,length)
			
			for (var i=0; i<length; i++) {
				if (arr[i] == arr[i+3]) { //四条判断
					four = arr[i];
				}else if(arr[i] == arr[i+2]) {//三条判断
					three = arr[i];
				}else if( arr[i] == arr[i+1]) {//两对判断
					pair = arr[i];
				}else { //高牌及顺子判断
					if(four==0 && three==0 && pair == 0) {
						highCard=1	
					}
				}
			}	
			if( four != 0 ) {	//四条判断	
				if( arr[arr.length-1] == four ) {
					var fourArr = [four,four,four,four,arr[length-5]]
					fourArr = colorMatching(pxColor,fourArr);
					return {px:fourArr,size:8,name:"四条"};
				}else{
					var fourArr = [four,four,four,four,arr[length-1]]
					fourArr = colorMatching(pxColor,fourArr);
					return {px:fourArr,size:8,name:"四条"};
				}
			}
			// 顺子判断
			var arrNewPos =straight( noRepeat(arr) );  //顺子的第一张牌
			console.log( arrNewPos )
			if (arrNewPos != 0) {
				if (arrNewPos == 13) { //pos=13 皇家同花顺
					var straigh = [14,13,12,11,10];
					straigh = colorMatching(pxColor,straigh);
					return {px:straigh,size:5,name:"顺子"}
				}else{
					if( arrNewPos == 1 ) {
						var straigh = [14,arrNewPos+1,arrNewPos+2,arrNewPos+3,arrNewPos+4];
						straigh = colorMatching(pxColor,straigh);
						return {px:straigh,size:5,name:"顺子"}	
					}else {
						var straigh = [arrNewPos,arrNewPos+1,arrNewPos+2,arrNewPos+3,arrNewPos+4];
						straigh = colorMatching(pxColor,straigh);
						return {px:straigh,size:5,name:"顺子"}	
					}
				}
			}
			
			if( three != 0 && four == 0 ) {	//三条判断
				var threeArr = []; //去掉三条的数组
				for (var i=0; i<length; i++) {
					if (arr[i] != three) {
						threeArr.push(arr[i])
					}
				}	
				threeArr = threeArr.sort(function(a,b) {return a-b})
				console.log(threeArr)
				var sanTiaoDui = 0;
				for(var i=0; i<threeArr.length; i++) {
					if (threeArr[i] == threeArr[i+1]) { //葫芦判断
						sanTiaoDui = threeArr[i]
					}
				}
				if( sanTiaoDui != 0 ) { 
					var threeNewArr = [three,three,three,sanTiaoDui,sanTiaoDui];
					threeNewArr = colorMatching(pxColor,threeNewArr);
					return {px:threeNewArr,size:7,name:"葫芦"};
				}else {
					var threeNewArr = [three,three,three,threeArr[threeArr.length-1],threeArr[threeArr.length-2]]
					threeNewArr = colorMatching(pxColor,threeNewArr);
					return {px:threeNewArr,size:4,name:"三条"};
				}	
			}
			
			if( pair != 0 && three == 0 && four == 0 ) { // 对子判断
				var pairArr = []; //去掉最大对子的数组  
				var doublePair = 0;
				var pairDan = 0;
				for (var i=0; i<arr.length; i++) {
					if (arr[i] != pair) {
						pairArr.push(arr[i])
					}
				}
				pairArr = pairArr.sort(function(a,b) {return a-b})	
				for(var i=0; i<pairArr.length; i++) {
					if (pairArr[i] == pairArr[i+1]) { //对子判断
						doublePair = pairArr[i]
					}
				}
				
				
				
				if( doublePair != 0 ) {  //liangdui
					if( doublePair == pairArr[pairArr.length-1] ) {
						pairDan = pairArr[pairArr.length-3] 
					}else {
						pairDan = pairArr[pairArr.length-1] 
					}
						
					var pairArr = [pair,pair,doublePair,doublePair,pairDan];
					pairArr = colorMatching(pxColor,pairArr);
					return {px:pairArr,size:3,name:"两对"};
				}else {
					var pairArr = [pair,pair,pairArr[pairArr.length-1], pairArr[pairArr.length-2], pairArr[pairArr.length-3] ];
					pairArr = colorMatching(pxColor,pairArr);
					return {px:pairArr,size:2,name:"对子"};
				}		
			}
			
			if(highCard != 0) {
				highCardArr = [arr[length-1], arr[length-2], arr[length-3], arr[length-4], arr[length-5]];
				highCardArr = colorMatching(pxColor,highCardArr);
				return {px:highCardArr,size:1,name:"高牌"};	
			}
		}
	}

	
	function straight(array) {
		var posStart = 0; //顺子开始数
//		console.log(array)
		var length = array.length
		if(posStart == 0) {
			if (array[length-1]==14 && array[0] == 2 && array[3] == 5) {
				posStart = 1;
			}
		}
		for(var i=0; i<length-4; i++) {
			if (array[i] == array[i+4]-4) {
				if( array[length-1] == 14 && array[length-5] == 10  ) {
					posStart = 13;
				}else {
					posStart = array[i];
				}	
			}	
		}
		return posStart;	
	}
	//去重
	function noRepeat(array) { 
		var brr = [];
		var length = array.length;
		
		for(var i=0; i<length; i++) {
			if( brr.indexOf( array[i] )  == -1) {
				brr.push( array[i] )
			}
		}
		return brr;
	}
	// 牌型赋予颜色
	function colorMatching(pxColor,arr) { 
		var crr = [] //牌型及花色的数组
		for(var i=0; i<arr.length; i++) {
			for(var j=0; j<pxColor.length; j++) {
				if( crr.length < 5) {
					if(arr[i] == pxColor[j].pxBrr) {
						 crr.push( pxColor[j] );
						 pxColor.splice(j,1);
					}
				}
			}
		}
//		console.log(crr)
		return crr;
	}
	
	//统计各花色的个数并判断是否同花
	function equallyColors(brrColor,brr) {	
		var hearts=0,spades=0,diamonds=0,clubs=0,flag=false,color=5,colorPai=[];
		for (var i=0; i<brrColor.length; i++) {
			switch (brrColor[i]) {
				case 1 : hearts++;break;
				case 2 : spades++;break;
				case 3 : diamonds++;break;
				case 4 : clubs++;break;
			}
		}
		var brrColorNum = [hearts,spades,diamonds,clubs];	
		for(var i=0; i<4; i++) {
			if (brrColorNum[i] >= 5) {
				flag = true;
				colorPai = lookupColor(brr,i+1); // 统计同花的牌型
				color = i+1;
			}
		}
		return {flag:flag,colorPai:colorPai,color:color};
	}
	
	//统计同花的牌
	function lookupColor(brrA,color) {
		var newBrr=[], brrColor=[], newColorBrr=[]; 
		for(var i=0; i<brrA.length; i++) {
			brrColor.push( parseInt(brrA[i].toString().slice(0,1)) );
			newBrr.push( parseInt( brrA[i].toString().slice(2,brr[i].length) ))
		}
		for(var i=0; i<7; i++) {
			if( brrColor[i] == color) {
				newColorBrr.push(newBrr[i])
			}
		}
		return newColorBrr;	
	}
	
	// "a-b" a (1,2,3,4) 代表花色  b 代表牌型  14 代表A 13-2 代表 K-2
	var brr = ["2-14","1-14","3-3","1-3","1-5","4-7","4-14"];
	var pxInfo = compareSize(brr)
	console.log(pxInfo)


});