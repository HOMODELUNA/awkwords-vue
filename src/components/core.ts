


type sstack = (string | sstack | {maybe: sstack} )[]
type PatternTree = (string|{maybe:PatternTree})[]
function valid<T>(s : T | undefined|null): T{
	if (s === undefined || s === null){
		throw new Error("")
	}
	return s
}
function sample<T>(arr:Array<T>): T {
	return arr[Math.floor(Math.random()*arr.length)]
}

function pattern_tree(str : string){
	var stack : sstack = []
	for(const c of str){
		switch(c){
			case "(":{
				stack.push([])
			}break;
			case ")":{
				stack.push({maybe: stack.pop() as sstack[]})
			}break;
			default:{
				let last = stack[stack.length-1]
				if(last instanceof Array){
					last.push(c)
				}else{
					stack.push(c)
				}
			}
		}
	}
	return stack
}

function generate_one(pattern:PatternTree,subpatterns:Map<string,string[]>){
	var res = "";
	for(const token of pattern){
		if (typeof(token) ==  "string"){
			res += sample(valid(subpatterns.get(token)))
			continue
		}
		if(Math.random() < 0.5){continue}
		res+= generate_one(token.maybe,subpatterns)
	}
	return res
}

function generate_many(num:number,pattern:PatternTree,subpatterns:Map<string,string[]>){
	var res = []
	while(res.length < num){
		const g = generate_one(pattern,subpatterns)
		if (res.find((x) => x==g) == null){
			res.push(g)
		}
	}
	return res
}
export {pattern_tree,generate_one,generate_many,type PatternTree}