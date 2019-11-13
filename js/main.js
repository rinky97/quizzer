
var awesomeQuiz = {
    settings:{
        answers: []
    },    
    loadQuiz:function(){
        $('.panel_one h1').show("drop",500,function(){
            $('.start_quiz').addClass("started",500)
        });

        $('.start_quiz').on('click',function(){
            awesomeQuiz.showPanel(1);
            awesomeQuiz.listenNext()
        })
    },
    showPanel:function(position){
        var current = $('div[data-panel="'+ (position - 1)+'"]');
        
        
        current.find('.wrapper').animate({left:"-=100px",opacity:0},500,function(){
            current.addClass('hidden');

            //show next
            var next = $('div[data-panel="'+ position +'"]');
            next.removeClass('hidden');
            awesomeQuiz.showWrapper(next);
        });
    },
    showWrapper:function(next){
        var wrapper = next.find('.wrapper');

        wrapper.fadeIn('500',function(){
            awesomeQuiz.manageOptions(next);
        })
       
    },
    manageOptions:function(next){
        var options = next.find('.options');
        var children = options.find('div')
        var counter = 0
        
        children.each(function(index, el){
            $(el).delay(counter).fadeIn(300)
            counter += 500
        })
        
        children.on('click', function(){
            children.removeClass('active')
            next.addClass('valid')
            $(this).addClass('active')
        })
    },
    listenNext:function(){
        $('.next_question').on('click',function(){
            if(awesomeQuiz.validateSection($(this))){
                var newPosition = $(this).data('next')
                awesomeQuiz.showPanel(newPosition)
                awesomeQuiz.showProgress(newPosition)
            }
        })
    },
    validateSection:function($this){
        var parent = $this.parents().eq(1)
        
        if(parent.hasClass('valid')){
            return true
        }else{
            $('.error').fadeIn('300', function(){
                $(this).delay(1000).fadeOut('300')
            })
        }
    },
    showProgress:function(panel){
        $('.progress .bar').animate({width:'+=25%'},500)

        var option = $('div[data-panel="'+(panel-1)+'"]')
        var children = option.find('.options')

        children.find('div').each(function(index, el){
           if($(this).hasClass('active')){
               awesomeQuiz.settings.answers.push($(this).text())
           }
        })
            

    }


}

$(document).ready(function(){
    awesomeQuiz.loadQuiz();
})