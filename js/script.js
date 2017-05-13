$(function() {
    function verticalFlip(slider) {
        var currentImg = 0,
            $imgs = slider.find('.slider-img').addClass('collated'),
            sliderLength = $imgs.length,
            $buttonFlip = slider.find('.btn-flip'),
            sliderWindow = slider.find('.slider-window'),
            nextImg = function() {
                if ($imgs.length < 1) return;
                sliderWindow.append(
                    $imgs.eq( currentImg = ( currentImg + 1) % sliderLength ).addClass('vertically-flipped')
                );
            }
        slider.addClass('slider-running');
        $buttonFlip.on('click', nextImg);
    }
    function horizontalFlip(slider) {
        var currentImg = 0,
            $imgs = slider.find('.slider-img').addClass('collated'),
            sliderLength = $imgs.length,
            $buttonFlip = slider.find('.btn-flip'),
            sliderWindow = slider.find('.slider-window'),
            nextImg = function() {
                if ($imgs.length < 1) return;
                sliderWindow.append(
                    $imgs.eq( currentImg = ( currentImg + 1) % sliderLength ).addClass('horizontally-flipped')
                );
            }
        slider.addClass('slider-running');
        $buttonFlip.on('click', nextImg);
    }
    
    
    verticalFlip($(".slider-flip-vert"));
    horizontalFlip($(".slider-flip-horiz"));
});