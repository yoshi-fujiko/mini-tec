/// <reference path="../definitions/jquery.d.ts" />
module BACKLOG {

	export class addOpenCloseMenu {

		constructor() {

		}

		// get node navi
		getNaviNode(): any {
			return document.getElementById("gantt_navi");
		}

		// set node navi
		setNaviNode(): string {
			return '[<a href="javascript:void(0);" id="fullOpen">open</a> | <a href="javascript:void(0);" id="fullClose">close</a>]';
		}

	}

	export class myGantt {

		private userName: string;

		constructor() {
			
			if (this.checkGrouping()) {
				this.userName = this.GetLoginUser();
				this.getMyGanttChart();
			}
		
		}

		// check grouping: 担当者
		checkGrouping(): boolean {
			var current: any = document.getElementsByClassName("current");
			for (var i = 0, I = current.length; i < I; i++) {
				if (current[i].innerHTML === "担当者") {
					return true;
				}
			}
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
			h4.className += " myGanntt";
			form = h4.nextSibling.nextSibling;
			br = form.nextSibling.nextSibling;
			ganttWrap.insertBefore(br, ganttWrap.firstChild);
			ganttWrap.insertBefore(form, ganttWrap.firstChild);
			ganttWrap.insertBefore(h4, ganttWrap.firstChild);
		}

	}

}

new BACKLOG.myGantt();