var MY_BACKLOG;
(function (MY_BACKLOG) {
    var CheckGrouping = (function () {
        function CheckGrouping() {
            this.checkVal = "担当者";
        }
        CheckGrouping.prototype.checkCategory = function () {
            var current = document.getElementsByClassName("current");
            for (var i = 0, I = current.length; i < I; i++) {
                if (current[i].innerHTML === this.checkVal) {
                    return true;
                }
            }
        };
        return CheckGrouping;
    })();
    MY_BACKLOG.CheckGrouping = CheckGrouping;

    var memberAnc = (function () {
        function memberAnc() {
            this.memberH4 = document.getElementsByClassName("group");
            this.setMemberAnc();
        }
        memberAnc.prototype.getMemberInfo = function () {
            var member = [];
            for (var i = 1, I = this.memberH4.length; i < I; i++) {
                member[i] = {};
                member[i].id = this.memberH4[i].getAttribute("id");
                member[i].name = this.memberH4[i].innerText.split("_")[1];
            }
            return member;
        };

        memberAnc.prototype.setMemberAnc = function () {
            var member = this.getMemberInfo();
            var ul = document.createElement("ul");
            var li = "";
            for (var i = 1, I = member.length; i < I; i++) {
                li += '<li><a href="#' + member[i].id + '">' + member[i].name + '</a></li>';
            }
            ul.setAttribute("id", "myMember");
            ul.innerHTML = li;
            document.getElementById("gantt_navi").appendChild(ul);
        };
        return memberAnc;
    })();
    MY_BACKLOG.memberAnc = memberAnc;

    var toggleGantt = (function () {
        function toggleGantt() {
            this.idOpen = document.getElementById("fullOpen");
            this.idClose = document.getElementById("fullClose");
            this.ganttTbl = document.getElementsByClassName("gantt_table");
            this.ganttTblLen = this.ganttTbl.length;
            this.setEevnt();
        }
        toggleGantt.prototype.ganttOpen = function () {
            for (var i = 0; i < this.ganttTblLen; i++) {
                this.ganttTbl[i].style.display = "block";
                this.ganttTbl[i].style.opacity = "1";
            }
        };

        toggleGantt.prototype.ganttClose = function () {
            for (var i = 1; i < this.ganttTblLen; i++) {
                this.ganttTbl[i].style.display = "none";
            }
        };

        toggleGantt.prototype.setEevnt = function () {
            var self = this;
            this.idOpen.addEventListener("click", function () {
                self.ganttOpen();
            });
            this.idClose.addEventListener("click", function () {
                self.ganttClose();
            });
        };
        return toggleGantt;
    })();
    MY_BACKLOG.toggleGantt = toggleGantt;

    var AddOpenCloseMenu = (function () {
        function AddOpenCloseMenu() {
            this.addNavi();
            new MY_BACKLOG.toggleGantt();
        }
        AddOpenCloseMenu.prototype.getNaviNode = function () {
            return document.getElementById("gantt_navi");
        };

        AddOpenCloseMenu.prototype.setNaviNode = function () {
            var addStr = '[ <a href="javascript:void(0);" id="fullOpen">open</a> | <a href="javascript:void(0);" id="fullClose">close</a> ]';
            var dom = document.createElement("span");
            dom.setAttribute("class", "myBacklogOpenClose");
            dom.innerHTML = addStr;
            return dom;
        };

        AddOpenCloseMenu.prototype.addNavi = function () {
            document.getElementById("gantt_navi").appendChild(this.setNaviNode());
        };
        return AddOpenCloseMenu;
    })();
    MY_BACKLOG.AddOpenCloseMenu = AddOpenCloseMenu;

    var MyGantt = (function () {
        function MyGantt() {
            this.userName = this.GetLoginUser();
            this.getMyGanttChart();
        }
        MyGantt.prototype.GetLoginUser = function () {
            var userTitle = document.getElementById("hellow").getElementsByTagName("a").item(0).getAttribute("title");
            var userName = userTitle.split("さんの")[0];
            return userName;
        };

        MyGantt.prototype.getMyGanttChart = function () {
            var group = document.getElementsByClassName("group");
            for (var i = 0, I = group.length; i < I; i++) {
                if (group[i].innerText.indexOf(this.userName) > 0) {
                    this.setMyGannttChart(group[i]);
                    break;
                }
            }
        };

        MyGantt.prototype.setMyGannttChart = function (group) {
            var h4, form, br;
            var ganttWrap = document.getElementById("gantt");
            h4 = group;
            h4.className += " myGantt";
            form = h4.nextSibling.nextSibling;
            br = form.nextSibling.nextSibling;
            ganttWrap.insertBefore(br, ganttWrap.firstChild);
            ganttWrap.insertBefore(form, ganttWrap.firstChild);
            ganttWrap.insertBefore(h4, ganttWrap.firstChild);
        };
        return MyGantt;
    })();
    MY_BACKLOG.MyGantt = MyGantt;
})(MY_BACKLOG || (MY_BACKLOG = {}));

var checkGrouping = new MY_BACKLOG.CheckGrouping();
if (checkGrouping.checkCategory()) {
    new MY_BACKLOG.MyGantt();
    new MY_BACKLOG.AddOpenCloseMenu();
    new MY_BACKLOG.memberAnc();
}
