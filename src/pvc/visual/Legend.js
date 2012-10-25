def.scope(function(){

    /**
     * Initializes a legend.
     * 
     * @name pvc.visual.Legend
     * 
     * @class Manages the options of a chart legend.
     * @extends pvc.visual.OptionsBase
     */
    def
    .type('pvc.visual.Legend', pvc.visual.OptionsBase)
    .add(/** @lends Legend# */{
        _getOptionsDefinition: function(){
            return legend_optionsDef;
        },
        
        _resolveByNaked: function(){
            // prevent naked resolution of legend
        }
    });
    
    /* PRIVATE STUFF */
    function castSize(size){
        // Single size or sizeMax (a number or a string)
        // should be interpreted as meaning the orthogonal length.
        
        if(!def.object.is(size)){
            var position = this.option('Position');
            size = new pvc.Size()
                .setSize(size, {
                    singleProp: pvc.BasePanel.orthogonalLength[position]
                });
        }
        
        return size;
    }
    
    function castAlign(align){
        var position = this.option('Position');
        return pvc.parseAlign(position, align);
    }
    
    /*global axis_optionsDef:true*/
    var legend_optionsDef = {
        /* legendPosition */
        Position: {
            resolve: '_resolveFull',
            cast:    pvc.parsePosition,
            value:   'bottom'
        },
        
        /* legendSize,
         * legend2Size 
         */
        Size: {
            resolve: '_resolveFull',
            cast:    castSize
        },
        
        SizeMax: {
            resolve: '_resolveFull',
            cast:    castSize
        },
        
        Align: {
            resolve: function(optionInfo){
                if(!this._resolveNormal(optionInfo)){
                    // Default value of align depends on position
                    var position = this.option('Position');
                    var align;
                    if(position !== 'top' && position !== 'bottom'){
                        align = 'top';
                    } else if(this.chart.compatVersion() <= 1) { // centered is better
                        align = 'left';
                    }
                    
                    optionInfo.defaultValue(align);
                }
            },
            cast: castAlign
        },
        
        Margins:  {
            resolve: function(optionInfo){
                if(!this._resolveNormal(optionInfo)){
                    
                    // Default value of margins depends on position
                    if(this.chart.compatVersion() > 1){
                        var position = this.option('Position');
                        
                        // Set default margins
                        var margins = def.set({}, pvc.BasePanel.oppositeAnchor[position], 5);
                        
                        optionInfo.defaultValue(margins);
                    }
                }
            },
            cast: pvc.Sides.as
        },
        
        Paddings: {
            resolve: '_resolveFull',
            cast:    pvc.Sides.as,
            value:   5
        },
        
        Font: {
            resolve: '_resolveFull',
            cast:    String,
            value:   '10px sans-serif'
        }
    };
});