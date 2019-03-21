window.onload = function(){
	//创建渲染DOM结构
	function creatDom(){
		var str = `<input type="text" value="" id="showResult"><br />
		    <input type="button" value="0">
		    <input type="button" value="1">
		    <input type="button" value="2">
		    <input type="button" value="3"><br />
		    <input type="button" value="4">
		    <input type="button" value="5">
		    <input type="button" value="6">
		    <input type="button" value="7"><br />
		    <input type="button" value="8">
		    <input type="button" value="9">
		    <input type="button" value="+">
		    <input type="button" value="-"><br />
		    <input type="button" value="*">
		    <input type="button" value="/">
		    <input type="button" value="CE">
		    <input type="button" value="=">
		    <input type="button" value="重置">`;
		    
		    document.getElementById('calculator').innerHTML = str;
	   
	}
	creatDom();
	
	let setEqual = false;//若按了'='就设置为true	
	getAllButtons();
	function getAllButtons(){
		let buttons = document.querySelectorAll('#calculator input[type="button"]');
		for (var i = 0;i<buttons.length;i++) {			
			buttons[i].onclick = function(){
				let value = document.getElementById('showResult').value;
				let item = this.value;

				//重置按钮清空数据
				if(item==='重置'){
					setEqual = false;
					document.getElementById('showResult').value = '';
					return;
				}				
				
				//计算了结果（按了‘=’）再点击数字则重新赋值
				if(setEqual){
					document.getElementById('showResult').value = item;
					setEqual = false;
					return;
				}
			
				// 最后一位为计算符号，且输入计算符号，删除上一个符号；
				//首位是 * / 删除再重新输入(可输入正负)
			    if (/[\-\+\*\/]$/.test(item) && /[\-\+\*\/]$/.test(value) || /^[\*\/]$/.test(value)) {
			    	value = value.substring(0, value.length - 1);
			    }
			    
			    // 首位为 0 且输入数字，删除 0，再输入
			    if (value === '0' && /\d/.test(item)) {
			        value = value.substring(0, value.length - 1);			        
			    }
			    
				if(item==='='){
					if (setEqual) {
				        document.getElementById('data').value = '';
				        return false;
				    }
					
				    setEqual = true;
				    let value = document.getElementById('showResult').value;
			    	
			    	 try {
				    	if(value!=""){
				    		//eval 计算某个字符串，并执行其中的的 JavaScript 代码
				    		document.getElementById('showResult').value = value + item + eval(value);
				    	}else{
				    		 alert('请输入数字！');
				    	}
				        
				    } catch (e) {
				        alert('输入有误！'+e);
				        document.getElementById('showResult').value = '';
				    }

				}else{//没有按‘=’时					
					document.getElementById('showResult').value = value + item;				
				}
				
				//按CE按钮清空数据  
				if(item==='CE'){
					if(!setEqual){//若未计算过结果，就点击一次从末尾减少一个字符的清除 
						document.getElementById('showResult').value = value.substring(0,value.length-1);
					}else{//若已计算过结果（按'='了），则重置（一次性全部清除字符）
						document.getElementById('showResult').value = '';
						setEqual = false;
					}
					return;
				}				
			}
		}
	}
	
}