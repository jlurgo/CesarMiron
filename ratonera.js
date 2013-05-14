var Ratonera = function(ui){
    this.ui = ui;
    this._start();
};
Ratonera.prototype._start = function(){
    var _this = this;
    this._ratones = [];
    
    var raton1 = new Raton(this.ui.find("#raton"));
    raton1.moverA(this.ui.width()/2, this.ui.height()/2);
    this._ratones.push(raton1);
    this.ui.mousemove(function(ev){  
        var e = ev;
        _this._ratones.forEach(function(raton){
            var angulo_queso_raton = _this.anguloEntre2Puntos(raton.x, 
                                                               raton.y, 
                                                               e.pageX, 
                                                               e.pageY);
            
            raton.elQuesoEstaA(angulo_queso_raton);
        });
    });
    
    this.ui.mousemove();
};
Ratonera.prototype.anguloEntre2Puntos = function(x1, y1, x2, y2){
    var calcAngle = Math.atan2(x1-x2,y2-y1)*(180/Math.PI);		
    if(calcAngle < 0)	
        calcAngle = Math.abs(calcAngle);
    else
        calcAngle = 360 - calcAngle;	
    
    if(calcAngle >= 90)	
        calcAngle = calcAngle - 90;
    else
        calcAngle = 270 + calcAngle;
    return calcAngle;
};                            

var Raton = function(ui){
    this.ui = ui;
    this._start();
};
Raton.prototype._start =  function(){
    var _this = this;
    this._cabezas = [];
    
//    var canvas = this.ui.find;
//    var ctx = canvas.getContext("2d");
//    
    this.ui.find("#cabeza")
        .children()
        .hide()
        .each(function(){
        _this._cabezas.push(new CabezaDeRatonMirandoA($(this), $(this).attr("angulo")));
    })
    this._cabeza = this._cabezas[0];
    this._cabeza.mostrar();
};
Raton.prototype.elQuesoEstaA = function(angulo_queso){
    var _this = this;
    var cabezaMirandoMasCercaDelQueso = this._cabezas[0];
    this._cabezas.forEach(function(una_cabeza){
        if(una_cabeza.diferenciaAngularCon(angulo_queso) < cabezaMirandoMasCercaDelQueso.diferenciaAngularCon(angulo_queso)){
            cabezaMirandoMasCercaDelQueso = una_cabeza;
        }
    });
    
    if(cabezaMirandoMasCercaDelQueso !== this._cabeza){
        this._cabeza.ocultar();
        this._cabeza = cabezaMirandoMasCercaDelQueso;
        this._cabeza.mostrar();
    }
};
Raton.prototype.moverA = function(x, y){
    this.x = x;
    this.y = y;
    this.ui.css("left", x - this.ui.width()/2 + 155);
    this.ui.css("top", y - this.ui.height()/3 + 25);
};

var CabezaDeRatonMirandoA = function(ui, angulo_mirada){
    this._ui = ui;
    this.anguloMirada = angulo_mirada;
    this._start();
};
CabezaDeRatonMirandoA.prototype._start =  function(){
};
CabezaDeRatonMirandoA.prototype.diferenciaAngularCon = function(angulo){
    var a = angulo - this.anguloMirada;
    a = (a + 180) % 360 - 180; 
    return Math.abs(a);
};
CabezaDeRatonMirandoA.prototype.mostrar = function(){
    this._ui.show();
};
CabezaDeRatonMirandoA.prototype.ocultar = function(){
    this._ui.hide();
};