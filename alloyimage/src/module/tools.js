/**
 * @author: Bin Wang
 * @description: 图像工具方法 不会返回AI本身，会得到图像的一些特征
 *
 */
;(function(Ps){

    window[Ps].module("Tools",function(P){

        var M = {
            //获得到图像的色系特征
            getColor: {
                process: function(imgData, args){
                
                  var dM = P.lib.dorsyMath;
                  var xyToIFun = dM.xyToIFun(imgData.width), i;

                  var sum = [0, 0, 0];


                  var level = 50;
                  var every = Math.PI * 2 / level, n;
                  
                  var result = [];

                  //在HSI空间应用
                  dM.applyInHSI(imgData, function(obj){
                    n = parseInt(obj.H / every);

                    if(result[n]){
                    }else{
                        result[n] = [];
                    }

                    result[n].push([obj.S, obj.I]);

                  });

                  var t = 3;

                  //计算出最大的level分区
                  var max = 0, maxI = 0;;
                  for(var i = 0; i < level; i ++){
                    if(result[i] && result[i].length > max){
                      max = result[i].length;
                      maxI = i;
                    }
                  }

                  //计算平均饱和度与灰度
                  var sumS = 0, avS, sumI = 0, avI;
                  for(var i = 0; i < result[maxI].length; i ++){
                    sumS += result[maxI][i][0];
                    sumI += result[maxI][i][1];
                  }

                  avS = sumS / result[maxI].length;
                  avI = sumI / result[maxI].length;

                  /*
                  var dResult = [], ddResult = [0];
                  //计算微分
                  for(var i = 1; i < level; i ++){
                    dResult[i] = result[i] - result[i - 1];
                  }

                  //计算2次微分
                  for(var i = 2; i < level; i ++){
                    ddResult[i] = dResult[i] - dResult[i - 1];
                  }

                  var rect2 = $AI(400, 400);
                  rect2.ctx(function(){
                    this.fillStyle = "#000";
                      this.moveTo(0, 200);
                      this.lineTo(400, 200);
                      this.stroke();

                      this.moveTo(0, 200);
                      for(var i = 0; i < result.length; i ++){
                        var x = i / result.length * 400;
                        var y = 400 - (result[i] / 100 + 200);

                        this.lineTo(x, y);
                        this.fillRect(x - 2, y - 2, 4, 4);
                      }

                      this.stroke();
                  }).show();

                  $AI(400, 100).show();

                  rect2.ctx(function(){
                      this.moveTo(0, 200);
                      this.lineTo(400, 200);
                      this.stroke();

                      this.fillStyle = "red";

                      this.moveTo(0, 200);
                      for(var i = 1; i < dResult.length; i ++){
                        var x = i / dResult.length * 400;
                        var y = 400 - (dResult[i] / 100 + 200);

                        this.lineTo(x, y);
                        this.fillRect(x - 2, y - 2, 4, 4);
                      }

                      this.stroke();
                  }).show();

                  /*
                  var rect3 = $AI(400, 400);
                  rect3.ctx(function(){
                      this.moveTo(0, 200);
                      this.lineTo(400, 200);
                      this.stroke();

                      this.moveTo(0, 200);
                      for(var i = 1; i < ddResult.length; i ++){
                        var x = i / ddResult.length * 400;
                        var y = 400 - (ddResult[i] / 1 + 200);

                        this.lineTo(x, y);
                      }

                      this.stroke();
                  }).show();
                  */

                  //计算出现频率最大的色相
                  var maxH = maxI * every;

                  var rgb = dM.HSIToRGB(maxH, avS, avI);

                  /*
                  var all = this.width * this.height * 3;
                  var r = parseInt(sum[0] / all);
                  var g = parseInt(sum[1] / all);
                  var b = parseInt(sum[2] / all);
                  */

                  var color = "rgb(" + parseInt(rgb.R) + "," + parseInt(rgb.G) + "," + parseInt(rgb.B) + ")";
                  return color;
                }
            }
        };

        return M;

    });

})("psLib");
