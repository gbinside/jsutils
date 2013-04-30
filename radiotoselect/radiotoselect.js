function inspect(obj, maxLevels, level)
{
  var str = '', type, msg;

    // Start Input Validations
    // Don't touch, we start iterating at level zero
    if(level == null)  level = 0;

    // At least you want to show the first level
    if(maxLevels == null) maxLevels = 1;
    if(maxLevels < 1)    
        return '<font color="red">Error: Levels number must be > 0</font>';

    // We start with a non null object
    if(obj == null)
    return '<font color="red">Error: Object <b>NULL</b></font>';
    // End Input Validations

    // Each Iteration must be indented
    str += '<ul>';

    // Start iterations for all objects in obj
    for(property in obj)
    {
      try
      {
          // Show "property" and "type property"
          type =  typeof(obj[property]);
          str += '<li>(' + type + ') ' + property +
                 ( (obj[property]==null)?(': <b>null</b>'):(": "+obj[property])) + '</li>';

          // We keep iterating if this property is an Object, non null
          // and we are inside the required number of levels
          if((type == 'object') && (obj[property] != null) && (level+1 < maxLevels))
          str += inspect(obj[property], maxLevels, level+1);
      }
      catch(err)
      {
        // Is there some properties in obj we can't access? Print it red.
        if(typeof(err) == 'string') msg = err;
        else if(err.message)        msg = err.message;
        else if(err.description)    msg = err.description;
        else                        msg = 'Unknown';

        str += '<li><font color="red">(Error) ' + property + ': ' + msg +'</font></li>';
      }
    }

      // Close indent
      str += '</ul>';

    return str;
}

function loadScript(url, callback)
{
    // adding the script tag to the head as suggested before
   var head = document.getElementsByTagName('head')[0];
   var script = document.createElement('script');
   script.type = 'text/javascript';
   script.src = url;

   // then bind the event to the callback function 
   // there are several events for cross browser compatibility
   script.onreadystatechange = callback;
   script.onload = callback;

   // fire the loading
   head.appendChild(script);
}

function radioToSelect(selettore_inputs, gruppa = null) {
    loadScript('//ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js', function() {
        jQuery.noConflict();
                
        jQuery(document).ready( function() {
            var options = new Array();
            var name = jQuery(selettore_inputs).eq(0).attr('name');   
    
            jQuery(selettore_inputs).each( function () {
                var label_html = jQuery('label[for="'+jQuery(this).attr('id')+'"]').html();                           
                options.push({ 
                    value: jQuery(this).attr('value') ,
                    _class: jQuery(this).attr('class') , 
                    html : label_html              
                });
                jQuery('label[for="'+jQuery(this).attr('id')+'"]').hide();
            });
            
            new_html = '<select id="'+name.replace(/\W/,'_')+'" class="radiotoselect" name="'+name+'">';
            new_html +='<option value="" >Select one...</option>';
            pre_gruppo = '';
            for (var key in options) {
                var html = options[key].html;
                if (gruppa) {
                    var text_array = html.split(gruppa);
                    if (text_array[0] != pre_gruppo) {                      
                        if (pre_gruppo) {
                            new_html += "</optgroup>";
                        }
                        pre_gruppo = text_array[0];
                        new_html += "<optgroup label=\""+pre_gruppo+"\">";                      
                    } 
                    html = text_array.slice(1).join(' - ');               
                }
            
                new_html +='<option value="'+options[key].value+'" class="'+options[key]._class+'">'+html+'</option>';
            }
            new_html += '</select>';
            
            jQuery(selettore_inputs).parent().parent().find('li').hide();
            jQuery(selettore_inputs).hide();
            jQuery(selettore_inputs).eq(0).show();
            jQuery(selettore_inputs).parent().parent().find('li').eq(0).show();                                    
            jQuery(selettore_inputs).eq(0).replaceWith(new_html);
            
            // debug  // jQuery('#debug').html( inspect ( options , 3 )   );
        });
        
    });    
}