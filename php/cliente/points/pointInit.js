(function (){
    var root = this;
    $(document).ready(function(){
        //RECUPERAR PUNTO
        $('#get-point').on('click',function(){
            var point_id = $('#point-id').val();
            viewPointDOM(point_id);
        });	
     });  
     
     function viewPointDOM(point_id){
         MAP_APP.getPoint(point_id)         
     }
     function renderPoint(data){         
         var result =""; 
         result += "<br/>Estado:"+data.status;
         result += "<br/>Mensaje:"+data.message;
         result += "<br/>Id:"+data.result.point_id;
         result += "<br/>CoordX:"+data.result.point_x;
         result += "<br/>CoordY:"+data.result.point_y;
         $('#result').html(result); 
     }
	
		
    if (!root.MAP_APP) {
        root.MAP_APP = {};
        root.MAP_APP = {};
    }
    root.MAP_APP.viewPointDOM = viewPointDOM;
    root.MAP_APP.renderPoint = renderPoint;
    
}).call(this);
