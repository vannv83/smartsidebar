(function (doc, _win) {
    'use strict';
    var defaults_sticky = {
        widthActive: 1024,
        elementSidebar: null,
        distanceFixedTop: 15,
        startFixed: 100,
        endFixed: 700,
        distanceChangeTop: 700,
        startFixed2: 1600,
        endFixed2: 1900,
        distanceChangeTop2: 700,
        startFixed3: 2700,
        endFixed3: 3100,
        distanceChangeTop3: 700,
        startFixed4: 4400,
        endFixed4: 4900,
        connectElement: "#connectId",
        connectElementFixedTop: 550,
        connectElement2: "#connectId2",
        connectElementFixedTop2: 550,
        sidebarStickyMode: 'sticky',
        endFixedElement: null,
        paddingSidebar: false,
        wSidebar: null,
        wWidgets: null,
        setHeightSidebar: null,
        adtags: []
    };

    function getValueCss(element, pro) {
        var value = window.getComputedStyle(element)[pro];
        return parseInt(value.replace("px", ""));
    }

    function between(x, min, max) {
        return x > min && x <= max;
    }
    let init = function () {
        let widthBody = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        var config = Object.assign({}, defaults_sticky, viStickyConfigs);
        console.log(config);
        if (widthBody < config.widthActive) {
            return;
        }
        var mainSidebar = document.querySelector(config.elementSidebar);
        if (!mainSidebar) {
            return;
        }

        var widthSidebar = 0;
        var widthWidgets = 0;

        var replicaSidebar = mainSidebar;
        var oldElemSidebar = replicaSidebar.innerHTML;
        var newElemSidebar = "<div id='vi-sticky'>" + oldElemSidebar + "</div>";
        replicaSidebar.innerHTML = newElemSidebar;
        widthSidebar = replicaSidebar.offsetWidth;

        if (config.setHeightSidebar && config.setHeightSidebar > 0) {
            var viStickys = document.getElementById("vi-sticky");
            viStickys.style.height = config.setHeightSidebar + "px";
        }

        if (config.paddingSidebar) {
            var styleSidebar = window.getComputedStyle ? getComputedStyle(replicaSidebar, null) : replicaSidebar.currentStyle;
            var pLeft = parseInt(styleSidebar.paddingLeft) || 0;
            var pRight = parseInt(styleSidebar.paddingRight) || 0;
            widthSidebar = replicaSidebar.offsetWidth - pLeft - pRight;
        }
        if (config.wSidebar) {
            widthSidebar = config.wSidebar;
        }
        widthWidgets = widthSidebar;
        config.widthSidebar = widthSidebar;
        if (config.wWidgets && config.wWidgets > 0) {
            widthWidgets = config.wWidgets;
        }
        config.widthWidgets = widthWidgets;
        for (let i = 0; i < config.adtags.length; i++) {
            const tagID = config.adtags[i];
            if (typeof vitag != 'undefined' && typeof viAPItag != 'undefined') {
                (vitag.Init = window.vitag.Init || []).push(function () { viAPItag.display(tagID) })
            }
            if (typeof powerTag != 'undefined' && typeof powerAPITag != 'undefined') {
                (powerTag.Init = window.powerTag.Init || []).push(function () { powerAPITag.display(tagID) })
            }
        }
        if (config.sidebarStickyMode === "sticky") {
            window.addEventListener("scroll", function () {
                var widthScreen = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                if (widthScreen >= config.widthActive) {
                    try {
                        handlerStickySidebar(config);
                    } catch (error) {

                    }
                }
            });
        }
    }

    function handlerStickySidebar(config) {
        var viSticky = document.getElementById("vi-sticky");
        if (!viSticky) {
            return;
        }
        var viSlotSticky = document.getElementsByClassName("vi-sticky-ad");
        var hTop = document.documentElement.scrollTop;
        console.log(hTop);
        if (viSlotSticky.length <= 1) {
            config.sidebarStickyMode = "normal";
        }
        for (let i = 0; i < viSlotSticky.length; i++) {
            viSlotSticky[i].style.opacity = 1;
            viSlotSticky[i].style.visibility = "visible";
        }
        if (hTop < config.startFixed) {
            viSticky.style.position = "";
            viSticky.style.top = "";
            viSticky.style.width = "";
        }
        if (hTop > config.startFixed && hTop < config.endFixed) {
            viSticky.style.position = "fixed";
            viSticky.style.top = (config.distanceFixedTop ? config.distanceFixedTop : 0) + "px";
            viSticky.style.width = config.widthSidebar + 'px';
            if (viSlotSticky[0]) {
                viSlotSticky[0].style.position = "";
                viSlotSticky[0].style.top = "";
            }
        }
        if (hTop > config.endFixed) {

            viSticky.style.position = `relative`;
            viSticky.style.top = config.distanceChangeTop + "px";
            viSticky.style.width = config.widthSidebar + "px";
            if (viSlotSticky.length > 1 && hTop < config.startFixed2) {
                if (viSlotSticky[1]) {
                    viSlotSticky[1].style.position = "";
                    viSlotSticky[1].style.top = "";
                    viSlotSticky[1].style.width = config.widthWidgets + 'px';
                }
                if (config.connectElement) {
                    var connectElement = document.querySelector(config.connectElement);
                    if (connectElement) {
                        connectElement.style.position = "";
                        connectElement.style.width = config.widthSidebar + 'px';
                        connectElement.style.top = "";
                    }
                }
                if (viSlotSticky[2]) {
                    viSlotSticky[2].style.position = "";
                    viSlotSticky[2].style.top = "";
                    viSlotSticky[2].style.width = config.widthWidgets + 'px';
                }
                if (viSlotSticky[3]) {
                    viSlotSticky[3].style.position = "";
                    viSlotSticky[3].style.top = "";
                    viSlotSticky[3].style.width = config.widthWidgets + 'px';
                }
            }
        }

        if (config.startFixed2 && config.endFixed2 && between(hTop, config.startFixed2, config.endFixed2) && viSlotSticky.length > 1) {
            viSticky.style.position = "";
            viSticky.style.top = "";
            if (viSlotSticky[1]) {
                viSlotSticky[1].style.position = "fixed";
                viSlotSticky[1].style.top = (config.distanceFixedTop2 ? config.distanceFixedTop2 : config.distanceFixedTop) + "px";
                viSlotSticky[1].style.width = config.widthWidgets + 'px';
                viSlotSticky[1].style.opacity = 1;
                viSlotSticky[1].style.visibility = "visible";
            }
            if (config.connectElement) {
                var connectElement = document.querySelector(config.connectElement);
                if (connectElement) {
                    connectElement.style.position = "fixed";
                    connectElement.style.width = config.widthSidebar + 'px';
                    connectElement.style.top = config.connectElementFixedTop + "px";
                    connectElement.style.left = "unset";
                    connectElement.style.right = "unset";
                }
            }

            if (viSlotSticky[2]) {
                viSlotSticky[2].style.position = "fixed";
                viSlotSticky[2].style.width = config.widthWidgets + 'px';
                viSlotSticky[2].style.top = (config.connectElementFixedTop + connectElement.offsetHeight + getValueCss(connectElement, "margin-top") + getValueCss(connectElement, "margin-bottom")) + "px";
                viSlotSticky[2].style.opacity = 1;
                viSlotSticky[2].style.visibility = "visible";
            }
            if (config.connectElement2) {
                var connectElement2 = document.querySelector(config.connectElement2);
                if (connectElement2) {
                    connectElement2.style.position = "fixed";
                    connectElement2.style.width = config.widthSidebar + 'px';
                    connectElement2.style.top = (config.connectElementFixedTop2 + connectElement.offsetHeight + config.connectElementFixedTop + 15) + "px";
                    connectElement2.style.left = "unset";
                    connectElement2.style.right = "unset";
                }
            }
            if (viSlotSticky[3]) {
                viSlotSticky[3].style.position = "fixed";
                viSlotSticky[3].style.width = config.widthWidgets + 'px';
                viSlotSticky[3].style.top = (config.connectElementFixedTop + connectElement.offsetHeight + getValueCss(connectElement, "margin-top") + getValueCss(connectElement, "margin-bottom")) + "px";
                viSlotSticky[3].style.opacity = 1;
                viSlotSticky[3].style.visibility = "visible";
            }
        }


        if (hTop > config.endFixed2) {
            viSticky.style.position = `relative`;
            viSticky.style.top = config.distanceChangeTop2 + "px";
            viSticky.style.width = config.widthSidebar + "px";
            if (viSlotSticky.length > 2 && hTop < config.startFixed3) {
                if (viSlotSticky[1]) {
                    viSlotSticky[1].style.position = "";
                    viSlotSticky[1].style.top = "";
                    viSlotSticky[1].style.width = config.widthWidgets + 'px';
                }
                if (config.connectElement) {
                    var connectElement = document.querySelector(config.connectElement);
                    if (connectElement) {
                        connectElement.style.position = "";
                        connectElement.style.width = config.widthSidebar + 'px';
                        connectElement.style.top = "";
                    }
                }
                if (viSlotSticky[2]) {
                    viSlotSticky[2].style.position = "";
                    viSlotSticky[2].style.top = "";
                    viSlotSticky[2].style.width = config.widthWidgets + 'px';
                }
                if (config.connectElement2) {
                    var connectElement2 = document.querySelector(config.connectElement2);
                    if (connectElement2) {
                        connectElement2.style.position = "";
                        connectElement2.style.width = config.widthSidebar + 'px';
                        connectElement2.style.top = "";
                    }
                }
                if (viSlotSticky[3]) {
                    viSlotSticky[3].style.position = "";
                    viSlotSticky[3].style.top = "";
                    viSlotSticky[3].style.width = config.widthWidgets + 'px';
                }
            }
        }


        if (config.startFixed3 && config.endFixed3 && between(hTop, config.startFixed3, config.endFixed3) && viSlotSticky.length > 2) {
            viSticky.style.position = "";
            viSticky.style.top = "";
            if (viSlotSticky[2]) {
                viSlotSticky[2].style.position = "fixed";
                viSlotSticky[2].style.top = (config.distanceFixedTop3 ? config.distanceFixedTop3 : config.distanceFixedTop) + "px";
                viSlotSticky[2].style.width = config.widthWidgets + 'px';
                viSlotSticky[2].style.opacity = 1;
                viSlotSticky[2].style.visibility = "visible";
            }

            if (viSlotSticky[1]) {
                viSlotSticky[1].style.position = "";
                viSlotSticky[1].style.width = config.widthWidgets + 'px';
                viSlotSticky[1].style.top = "";
                viSlotSticky[1].style.opacity = 1;
                viSlotSticky[1].style.visibility = "visible";
            }
            if (config.connectElement) {
                var connectElement = document.querySelector(config.connectElement);
                if (connectElement) {
                    connectElement.style.position = "";
                    connectElement.style.width = config.widthSidebar + 'px';
                    connectElement.style.top = "";
                }
            }
            if (config.connectElement2) {
                var connectElement2 = document.querySelector(config.connectElement2);
                if (connectElement2) {
                    connectElement2.style.position = "fixed";
                    connectElement2.style.width = config.widthSidebar + 'px';
                    connectElement2.style.top = (config.connectElementFixedTop2) + "px";
                }
            }
            if (viSlotSticky[3]) {
                viSlotSticky[3].style.position = "fixed";
                viSlotSticky[3].style.width = config.widthWidgets + 'px';
                viSlotSticky[3].style.top = (config.connectElementFixedTop2 + connectElement2.offsetHeight + getValueCss(connectElement2, "margin-top") + getValueCss(connectElement2, "margin-bottom")) + "px";
                viSlotSticky[3].style.opacity = 1;
                viSlotSticky[3].style.visibility = "visible";
            }
        }


        if (hTop > config.endFixed3) {
            viSticky.style.position = `relative`;
            viSticky.style.top = config.distanceChangeTop3 + "px";
            viSticky.style.width = config.widthSidebar + "px";
            if (viSlotSticky.length > 3 && hTop < config.startFixed4) {
                if (viSlotSticky[2]) {
                    viSlotSticky[2].style.position = "";
                    viSlotSticky[2].style.top = "";
                    viSlotSticky[2].style.width = config.widthWidgets + 'px';
                }
                if (config.connectElement) {
                    var connectElement = document.querySelector(config.connectElement);
                    if (connectElement) {
                        connectElement.style.position = "";
                        connectElement.style.width = config.widthSidebar + 'px';
                        connectElement.style.top = "";
                    }
                }
                if (config.connectElement2) {
                    var connectElement2 = document.querySelector(config.connectElement2);
                    if (connectElement2) {
                        connectElement2.style.position = "";
                        connectElement2.style.width = config.widthSidebar + 'px';
                        connectElement2.style.top = "";
                    }
                }
                if (viSlotSticky[3]) {
                    viSlotSticky[3].style.position = "";
                    viSlotSticky[3].style.top = "";
                    viSlotSticky[3].style.width = config.widthWidgets + 'px';
                }
            }
        }


        if (config.startFixed4 && config.endFixed4 && between(hTop, config.startFixed4, config.endFixed4) && viSlotSticky.length > 3) {
            viSticky.style.position = "";
            viSticky.style.top = "";
            if (viSlotSticky[3]) {
                viSlotSticky[3].style.position = "fixed";
                viSlotSticky[3].style.top = (config.distanceFixedTop4 ? config.distanceFixedTop4 : config.distanceFixedTop) + "px";
                viSlotSticky[3].style.width = config.widthWidgets + 'px';
                viSlotSticky[3].style.opacity = 1;
                viSlotSticky[3].style.opacity = 1;
                viSlotSticky[3].style.visibility = "visible";
            }
            if (viSlotSticky[1]) {
                viSlotSticky[1].style.position = "";
                viSlotSticky[1].style.width = config.widthWidgets + 'px';
                viSlotSticky[1].style.top = "";
            }
            if (viSlotSticky[2]) {
                viSlotSticky[2].style.position = "";
                viSlotSticky[2].style.width = config.widthWidgets + 'px';
                viSlotSticky[2].style.top = "";
            }
            if (config.connectElement) {
                var connectElement = document.querySelector(config.connectElement);
                if (connectElement) {
                    connectElement.style.position = "";
                    connectElement.style.width = config.widthSidebar + 'px';
                    connectElement.style.top = "";
                }
            }
            if (config.connectElement2) {
                var connectElement2 = document.querySelector(config.connectElement2);
                if (connectElement2) {
                    connectElement2.style.position = "";
                    connectElement2.style.width = config.widthSidebar + 'px';
                    connectElement2.style.top = "";
                }
            }
        }
        if (config.endFixedElement != "") {
            var endOffEvent = null;
            endOffEvent = document.querySelector(config.endFixedElement);
            if (endOffEvent && endOffEvent.getBoundingClientRect().top < 500) {
                viSticky.style.position = "";
                viSticky.style.top = "";
                if (viSlotSticky[1]) {
                    viSlotSticky[1].style.opacity = 0;
                    viSlotSticky[1].style.visibility = "hidden";
                }
                if (viSlotSticky[2]) {
                    viSlotSticky[2].style.opacity = 0;
                    viSlotSticky[2].style.visibility = "hidden";
                }
                if (viSlotSticky[3]) {
                    viSlotSticky[3].style.opacity = 0;
                    viSlotSticky[3].style.visibility = "hidden";
                }
            }
        }
    }
    init();
}(document, window));