module MY_BACKLOG {

	/* 担当者別ソートになっているかチェック */
	export class CheckGrouping {

		private checkVal: string;

		constructor() {
			this.checkVal = "担当者";
		}

		checkCategory(): boolean {
			var current: any = document.getElementsByClassName("current");
			for (var i = 0, I = current.length; i < I; i++) {
				if (current[i].innerHTML === this.checkVal) {
					return true;
				}
			}
		}

	}

	/* 各メンバーへのページ内アンカー */
	export class memberAnc {

		private memberH4: any;

		constructor() {
			this.memberH4 = document.getElementsByClassName("group");
			this.setMemberAnc();
		}

		getMemberInfo(): any {
			var member: any[] = [];
			for (var i: number = 1, I = this.memberH4.length; i < I; i++) {
				member[i] = {};
				member[i].id = this.memberH4[i].getAttribute("id");
				member[i].name = this.memberH4[i].innerText.split("_")[1];
				member[i].icon = this.memberH4[i].getElementsByClassName("target_icon").item(0).getAttribute("src");
			}
			return member;
		}

		setMemberAnc(): any {
			var member: any = this.getMemberInfo();
			var ul: any = document.createElement("ul");
			var li: string = "";
			for (var i: number = 1, I = member.length; i < I; i++) {
				li += '<li style="background-image:url(' + member[i].icon + ')"><a href="#' + member[i].id + '">' + member[i].name + '</a></li>';
			}
			ul.setAttribute("id", "myMember");
			ul.innerHTML = li;
			document.getElementById("gantt_navi").appendChild(ul);
		}

	}

	/* 全メンバーのテーブル open : close */
	export class toggleGantt {

		private idOpen: any;
		private idClose: any;
		private ganttTbl: any;
		private ganttTblLen: number;

		constructor() {
			this.idOpen = document.getElementById("fullOpen");
			this.idClose = document.getElementById("fullClose");
			this.ganttTbl = document.getElementsByClassName("gantt_table");
			this.ganttTblLen = this.ganttTbl.length;
			this.setEevnt();
		}

		// open
		ganttOpen(): any {
			for (var i = 0; i < this.ganttTblLen; i++) {
				this.ganttTbl[i].style.display = "block";
				this.ganttTbl[i].style.opacity = "1";
			}
		}

		// close
		ganttClose(): any {
			for (var i = 1; i < this.ganttTblLen; i++) {
				this.ganttTbl[i].style.display = "none";
			}
		}

		// set event
		setEevnt(): any {
			var self = this;
			this.idOpen.addEventListener("click", function() {
				self.ganttOpen();
			});
			this.idClose.addEventListener("click", function() {
				self.ganttClose();
			});
		}

	}

	export class AddOpenCloseMenu {

		constructor() {
			this.addNavi();
			new MY_BACKLOG.toggleGantt();
		}

		// get node navi
		getNaviNode(): any {
			return document.getElementById("gantt_navi");
		}

		// set node navi
		setNaviNode(): any {
			var addStr: string = '[ <a href="javascript:void(0);" id="fullOpen">open</a> | <a href="javascript:void(0);" id="fullClose">close</a> ]';
			var dom: any = document.createElement("span");
			dom.setAttribute("class", "myBacklogOpenClose");
			dom.innerHTML = addStr;
			return dom;
		}

		// add navi
		addNavi(): any {
			document.getElementById("gantt_navi").appendChild(this.setNaviNode());
		}

	}

	export class MyGantt {

		private userName: string;

		constructor() {
			this.userName = this.GetLoginUser();
			this.getMyGanttChart();
		
		}

		// get login user
		GetLoginUser(): string {
			var userTitle: string = document.getElementById("hellow").getElementsByTagName("a").item(0).getAttribute("title");
			var userName: string = userTitle.split("さんの")[0];
			return userName;
		}

		// get my gantt chart
		getMyGanttChart(): any {
			var group: any = document.getElementsByClassName("group");
			for (var i = 0, I = group.length; i < I; i++) {
				if (group[i].innerText.indexOf(this.userName) > 0) {
					this.setMyGannttChart(group[i]);
					break;
				}
			}
		}

		// set my gantt chart
		setMyGannttChart(group: any): any {
			var h4: any, form: any, br: any;
			var ganttWrap: any = document.getElementById("gantt");
			h4 = group;
			h4.className += " myGantt";
			form = h4.nextSibling.nextSibling;
			br = form.nextSibling.nextSibling;
			ganttWrap.insertBefore(br, ganttWrap.firstChild);
			ganttWrap.insertBefore(form, ganttWrap.firstChild);
			ganttWrap.insertBefore(h4, ganttWrap.firstChild);
		}

	}

}

var checkGrouping = new MY_BACKLOG.CheckGrouping();
if (checkGrouping.checkCategory()) {
	new MY_BACKLOG.MyGantt();
	new MY_BACKLOG.AddOpenCloseMenu();
	new MY_BACKLOG.memberAnc();
}