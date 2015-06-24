$(document).ready(function() {


    if ($("body").hasClass("post-template")) {
        General.updateImageWidth(),
        $('img[alt="cover"]').addClass("cover-image"),
        General.addIcons()
    }

    $('.arrow_down').click(function() {
        $('html,body').animate({
                scrollTop: $(window).height() - 20
            }, 
            800
        );
        return false;
    });

    $('.single-post-inner p:has(img)').each(function() {
        var _this = $(this);
        _this.addClass('with-img');
    });

    $('.icon-weixin-reverse').click(function() {
        $('[data-toggle="popover"]').popover('toggle');
        var i = $('[role="tooltip"]').attr('class').indexOf('in');
        if(i != -1) {
            $('.popover-content').append('<div id="qr-code"></div>');
            $('#qr-code').qrcode({
                width: 100,
                height: 100,
                text: window.location.href
            });
        }
    });

});

General = {

    updateImageWidth: function() {
        var $postContent = $(".post-content");
        $postContent.fitVids();
        var $img = $(".single-post-inner img").on('load', updateImageWidth);
        casperFullImg();
        function updateImageWidth() {
            var $this = $(this),
                contentWidth = $postContent.outerWidth(), // Width of the content
                imageWidth = this.naturalWidth; // Original image resolution

            if (imageWidth >= contentWidth) {
                $this.addClass('full-img');
            } else {
                $this.removeClass('full-img');
            }
        }
        function casperFullImg() {
            $img.each(updateImageWidth);
        }
    },

    urlIconlize: function(url) {
        var domain,
            _output;

        var iconMap = { 
            'google': 'icon-google',
            'weibo': 'icon-weibo',
            'twitter': 'icon-twitter',
            'douban': 'icon-douban',
            'facebook': 'icon-facebook',
            'weixin': 'icon-weixin',
            'github': 'icon-github',
            'bili': 'icon-bili',
            'dribble': 'icon-dribble',
            'shuai': 'icon-shuai'
        }

        for (var name in iconMap) {
            if (typeof iconMap[name] !== 'function') {
                var MapKey = name;
                if (url.indexOf(MapKey) >= 0) {
                    domain = MapKey;
                    _output = iconMap[MapKey];
                }
            }
        }
        return _output;
    },

    addIcons: function() {
        /* url的ico识别 */
        $('.single-post-inner p a:not(:has(img))').each(function(i) {
            var _src = $(this).attr('href');
            var tmp = document.createElement('a');
            tmp.href = _src;
            _selfDomain = tmp.hostname;
            $(this).prepend('<i class="iconfont ' + General.urlIconlize(_selfDomain) + '"></i>');
            var _selfColor = $(this).find('i').css('color'),
                _originalColor = $(this).css('color');

            $(this).hover(function() {
                $(this).css('color', _selfColor);
                $(this).addClass('animated pulse');
            }, function() {
                $(this).css('color', _originalColor);
                $(this).removeClass('animated pulse');
            });

        });
    }
};


