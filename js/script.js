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
    
    function simpleSlider(slider, transitions) {
        var $imgs = $.map(slider.find('.slider-img').addClass('collated'), function(x) {return $(x)}),
            sliderLength = $imgs.length,
            $buttonForward = slider.find('.btn-forward').removeAttr("disabled"),
            $buttonBackward = slider.find('.btn-backward').removeAttr("disabled"),
            sliderWindow = slider.find('.slider-window'),
            direction = slider.hasClass("slider-vertical") ? "vertical" : "horizontal",
            forwardClass = transitions[direction][1],
            reverseClass = transitions[direction][0];
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
        return { 
            next: nextImg,
            previous: prevImg
        }
    }
    function flip(slider) {
        return simpleSlider(slider, { horizontal: [
                'horizontally-flipped',
                'horizontally-flipped-forward'],
            vertical: [
                'vertically-flipped',
                'vertically-flipped-forward']});
    }        
    function shuffle(slider) {
        return simpleSlider(slider, { horizontal: [
                'horizontally-shuffled-out',
                'horizontally-shuffled-in'],
            vertical: [
                'vertically-shuffled-out',
                'vertically-shuffled-in']});
    }
    function fancyShuffle(slider) {
        return simpleSlider(slider, { horizontal: [
                'fancy-shuffled-out',
                'fancy-shuffled-in'],
            vertical: [
                'fancy-shuffled-out',
                'fancy-shuffled-in']});        
    }
    flip($("#flip-vert"));
    flip($("#flip-horiz"));
    shuffle($("#shuffle-horiz"));
    shuffle($("#shuffle-vert"));
    fancyShuffle($("#shuffle-fancy"));
});