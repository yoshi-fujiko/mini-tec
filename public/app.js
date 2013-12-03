var BACKLOG;
(function (BACKLOG) {
    var addOpenCloseMenu = (function () {
        function addOpenCloseMenu() {
        }
        addOpenCloseMenu.prototype.getNaviNode = function () {
            return document.getElementById("gantt_navi");
        };

        addOpenCloseMenu.prototype.setNaviNode = function () {
            return '[<a href="javascript:void(0);" id="fullOpen">open</a> | <a href="javascript:void(0);" id="fullClose">close</a>]';
        };
        return addOpenCloseMenu;
    })();
    BACKLOG.addOpenCloseMenu = addOpenCloseMenu;

    var myGantt = (function () {
        function myGantt() {
            if (this.checkGrouping()) {
                this.userName = this.GetLoginUser();
                this.getMyGanttChart();
            }
        }
        myGantt.prototype.checkGrouping = function () {
            var current = document.getElementsByClassName("current");
            for (var i = 0, I = current.length; i < I; i++) {
                if (current[i].innerHTML === "担当者") {
                    return true;
                }
            }
        };

        myGantt.prototype.GetLoginUser = function () {
            var userTitle = document.getElementById("hellow").getElementsByTagName("a").item(0).getAttribute("title");
            var userName = userTitle.split("さんの")[0];
            return userName;
        };

        myGantt.prototype.getMyGanttChart = function () {
            var group = document.getElementsByClassName("group");
            for (var i = 0, I = group.length; i < I; i++) {
                if (group[i].innerText.indexOf(this.userName) > 0) {
                    this.setMyGannttChart(group[i]);
                    break;
                }
            }
        };

        myGantt.prototype.setMyGannttChart = function (group) {
            var h4, form, br;
            var ganttWrap = document.getElementById("gantt");
            h4 = group;
            h4.className += " myGanntt";
            form = h4.nextSibling.nextSibling;
            br = form.nextSibling.nextSibling;
            ganttWrap.insertBefore(br, ganttWrap.firstChild);
            ganttWrap.insertBefore(form, ganttWrap.firstChild);
            ganttWrap.insertBefore(h4, ganttWrap.firstChild);
        };
        return myGantt;
    })();
    BACKLOG.myGantt = myGantt;
})(BACKLOG || (BACKLOG = {}));

new BACKLOG.myGantt();
