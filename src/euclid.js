function Euclidean(tatum, tactus){
	var rhythm=[1];
	for(var i=1; i<tatum; i++)
    {
		if(Math.floor((tactus/tatum)*i)>Math.floor((tactus/tatum)*(i-1)))
			rhythm[i]=1;
		else
			rhythm[i]=0;
	}
}