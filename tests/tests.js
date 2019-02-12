var o = require("ospec");

o.spec("math", function() {
	o.spec("arithmetics", function() {
		o("addition works", function() {
			o(1 + 2).equals(3)
		})
    })
})
,
o.spec("SomEnergiaData", function() {
    o("returns data", function(){
        var data = SomEnergiaData.loadData()
        o(data).notEquals(0)
    })
})