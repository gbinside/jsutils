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

function splitSelect(selettore_select) {
    loadScript('//ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js', function() {
        jQuery.noConflict();
                
        jQuery(document).ready( function() {
            var optgroup = new Array();     
            var name = jQuery(selettore_select).attr('name');   
                    
            jQuery(selettore_select).find('optgroup').each( function () {
                var self = jQuery(this);
                var options = new Array();
                self.find('option').each( function () {
                    options.push({ 
                        value: jQuery(this).attr('value') ,
                        class: jQuery(this).attr('class') , 
                        html : jQuery(this).html() 
                    
                    }); 
                });
                optgroup[self.attr('label')] = options;             
            });
            
            new_html = '<select id="tempip"><option>...select one</option>';
            for (var gr in optgroup) {
                new_html += '<option value="'+gr.replace(/\W/,'_')+'">'+gr+'</option>';
            }
            new_html += '</select>';
            for (var gr in optgroup) {
                new_html += '<select id="'+gr.replace(/\W/,'_')+'" class="splitterselect" name="'+name+'">';
                for (var key in optgroup[gr]) {
                    new_html +='<option value="'+optgroup[gr][key].value+'" class="'+optgroup[gr][key].class+'">'+optgroup[gr][key].html+'</option>'
                }
                new_html += '</select>';
            }                        
            
            jQuery(selettore_select).replaceWith(new_html);
            jQuery('.splitterselect').hide();
            
            jQuery('#tempip').change( function () {
                jQuery('.splitterselect').hide();
                jQuery('#'+jQuery(this).val()).show();    
            });
            
            // DEBUG // jQuery('#debug').html( inspect ( optgroup , 3 )   );
        });
        
    });    
}