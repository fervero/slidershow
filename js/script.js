$(function() {
    var animationEvent = (function whichAnimationEvent(){
        var t,
            el = document.createElement("fakeelement"),
            animations = {
            "animation"      : "animationend",
            "OAnimation"     : "oAnimationEnd",
            "MozAnimation"   : "animationend",
            "WebkitAnimation": "webkitAnimationEnd"
            }
        for (t in animations)
            if (el.style[t] !== undefined)
                return animations[t];
        return false;
    })(); 
    
    function flip(slider) {
        var $imgs = $.map(slider.find('.slider-img').addClass('collated'), function(x) {return $(x)}),
            sliderLength = $imgs.length,
            $buttonForward = slider.find('.btn-forward'),
            $buttonBackward = slider.find('.btn-backward'),
            sliderWindow = slider.find('.slider-window'),
            direction = slider.data('direction') || 'horizontal',
            flipClasses = {
                horizontal: ['horizontally-flipped',
                               'horizontally-flipped-forward'],
                vertical: [
                    'vertically-flipped',
                    'vertically-flipped-forward'
                ]
            },
            forwardClass = flipClasses[direction][1],
            reverseClass = flipClasses[direction][0];
            nextImg = function() {
                if ($imgs.length < 1) return;
                var $flippedImg = $imgs.pop();
                $flippedImg.addClass(forwardClass).one(animationEvent, function(e) {
                    var $this = $(this).removeClass(forwardClass);
                    $imgs.unshift($this);
                    sliderWindow.prepend($this);
                });
            },
            prevImg = function() {
                if ($imgs.length < 1) return;
                var $flippedImg = $imgs.shift();
                sliderWindow.append($flippedImg.addClass(reverseClass));
                $flippedImg.one(animationEvent, function(e) {
                    var $this = $(this).removeClass(reverseClass);
                    $imgs.push($this);
                });
            }
        slider.addClass('slider-running');
        $buttonForward.on('click', nextImg);
        $buttonBackward.on('click', prevImg);
    }
    flip($(".slider-flip").last());
    flip($(".slider-flip").first());
});