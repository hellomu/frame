const userLoginData = function() {
	let data = {
		retCode: "000000",
		retMsg: "成功",
		rows: {
			userType: 10,
			userName: "admin",
			userMobile: "+86100000",
			userEmail: "admin@tlkj.com",
			userCode: "98513235669417984",
			tokenName: "admin(+86100000)",
			secretKey:
				"akOQmI7NWxF4bZYFiMijcy2DFRwm1huaSTFvbZt1Uf1Z9UrLN/1ZY8r/XOIoYVCCBYjiRTAx+7Xl40x2kb55Ws98W9qHZE3THMcZ07jx+asUhD9HDNA21Fpc5SedUDcc4NhHs6kA5N91EmlqXRZwVdEWGSMbGknD5HSgBdCLFRrD9827K4E+mZVt9fWDfEjs6VZT0oapIyzBA5ccm02stUwOeQBEPmw6hU3nuGJkw+k3v99gtXL/F12ShCSkI5/c4J/Cjm7NfT8d5oLg6gYaew==",
			loginName: "admin",
			loginKey: "0cb9d8bc83404395b6abda4bb98b82d6",
			createTime: 1569759385000,
			cacheLimit: "1800"
		}
	};
	return data;
};

const userLogOut = function() {
	let data = {
		retCode: "000000",
		retMsg: "成功",
		rows: ""
	};
	return data;
};

const resetPass = function() {
	let data = {
		retCode: "000000",
		retMsg: "成功",
		rows: ""
	};
	return data;
};

const getMenuList = function() {
	let data = {
		retCode: "000000",
		retMsg: "成功",
		rows: {
			permList: ["npay:user:delete"],
			menuList: [
				{
					menuId: 1,
					parentId: 0,
					menuName: "系统管理",
					url: "",
					perms: "",
					type: 0,
					icon: "fa fa-cog",
					orderNum: 1,
					open: null,
					nodes: [
						{
							menuId: 2,
							parentId: 1,
							menuName: "操作员管理",
							url: "modules/sys/user.html",
							perms: null,
							type: 1,
							icon: "fa fa-user",
							orderNum: 1,
							open: null,
							list: null,
							parentName: null,
							nodes: [
								{
									menuId: 44,
									menuName: "操作员下属管理"
								}
							]
						}
					],
					parentName: null
				},
				{
					menuId: 52,
					parentId: 0,
					menuName: "用户管理",
					url: "",
					perms: "",
					type: 0,
					icon: "fa fa-user",
					orderNum: 2,
					open: null,
					nodes: [
						{
							menuId: 53,
							parentId: 52,
							menuName: "用户列表",
							url: "modules/user/user.html",
							perms: "user",
							type: 1,
							icon: "fa fa-user",
							orderNum: 1,
							open: null,
							list: null,
							parentName: null
						},
						{
							menuId: 54,
							parentId: 52,
							menuName: "昵称管理",
							url: "modules/user/nickname.html",
							perms: "nickname",
							type: 1,
							icon: "fa fa-user-o",
							orderNum: 1,
							open: null,
							list: null,
							parentName: null
						}
					],
					parentName: null
				},
				{
					menuId: 56,
					parentId: 0,
					menuName: "内容管理",
					url: "",
					perms: "",
					type: 0,
					icon: "fa fa-bell",
					orderNum: 3,
					open: null,
					nodes: [
						{
							menuId: 63,
							parentId: 56,
							menuName: "标签分类管理",
							url: "modules/contents/labclass.html",
							perms: "content",
							type: 1,
							icon: "fa fa-user-o",
							orderNum: 1,
							open: null,
							list: null,
							parentName: null
						},
						{
							menuId: 64,
							parentId: 56,
							menuName: "标签管理",
							url: "modules/contents/label.html",
							perms: "contents",
							type: 1,
							icon: "fa fa-tags",
							orderNum: 2,
							open: null,
							list: null,
							parentName: null,
							nodes: [
								{
									menuId: 99,
									menuName: "标签下属列表"
								},
								{
									menuId: 100,
									menuName: "视频下属列表2",
									nodes: [
										{
											menuId: 101,
											menuName: "视频下属列表21"
										}
									]
								}
							]
						},
						{
							menuId: 206,
							parentId: 56,
							menuName: "视频导入",
							url: "modules/contents/videoimport/index.html",
							perms: "execute:executeCommand",
							type: 1,
							icon: "fa fa-calculator",
							orderNum: 2,
							open: null,
							list: null,
							parentName: null,
							nodes: [
								{
									menuId: 999,
									menuName: "视频下属列表"
								}
							]
						},
						{
							menuId: 79,
							parentId: 56,
							menuName: "内容列表",
							url: "modules/contents/contentList.html",
							perms: "contents",
							type: 1,
							icon: "fa fa-bath",
							orderNum: 3,
							open: null,
							list: null,
							parentName: null
						},
						{
							menuId: 65,
							parentId: 56,
							menuName: "内容审核",
							url: "modules/contents/manual.html",
							perms: "contents",
							type: 1,
							icon: "fa fa-tags",
							orderNum: 4,
							open: null,
							list: null,
							parentName: null
						},
						{
							menuId: 66,
							parentId: 56,
							menuName: "审核不通过列表",
							url: "modules/contents/audit.html",
							perms: "contents",
							type: 1,
							icon: "fa fa-tags",
							orderNum: 6,
							open: null,
							list: null,
							parentName: null
						},
						{
							menuId: 78,
							parentId: 56,
							menuName: "自动审核白名单",
							url: "modules/contents/whitelist.html",
							perms: "contents",
							type: 1,
							icon: "fa fa-car",
							orderNum: 7,
							open: null,
							list: null,
							parentName: null
						}
					],
					parentName: null
				},
				{
					menuId: 57,
					parentId: 0,
					menuName: "广告管理",
					url: "",
					perms: "",
					type: 0,
					icon: "fa fa-book",
					orderNum: 4,
					open: null,
					nodes: [
						{
							menuId: 60,
							parentId: 57,
							menuName: "广告分类管理",
							url: "modules/advert/category.html",
							perms: "advert,category",
							type: 1,
							icon: "fa fa-heart",
							orderNum: 2,
							open: null,
							list: null,
							parentName: null
						},
						{
							menuId: 84,
							parentId: 57,
							menuName: "广告类别管理",
							url: "modules/advert/sort.html",
							perms: "advert",
							type: 1,
							icon: "fa fa-book",
							orderNum: 2,
							open: null,
							list: null,
							parentName: null
						},
						{
							menuId: 61,
							parentId: 57,
							menuName: "广告列表",
							url: "modules/advert/list.html",
							perms: "advert,list",
							type: 1,
							icon: "fa fa-list",
							orderNum: 3,
							open: null,
							list: null,
							parentName: null
						}
					],
					parentName: null
				},
				{
					menuId: 76,
					parentId: 0,
					menuName: "推荐管理",
					url: "",
					perms: "",
					type: 0,
					icon: "fa fa-rocket",
					orderNum: 5,
					open: null,
					nodes: [
						{
							menuId: 77,
							parentId: 76,
							menuName: "初始热度值配置",
							url: "modules/recommend/hotheat.html",
							perms: "recommend,hotheat",
							type: 1,
							icon: "fa fa-leaf",
							orderNum: 1,
							open: null,
							list: null,
							parentName: null
						}
					],
					parentName: null
				},
				{
					menuId: 58,
					parentId: 0,
					menuName: "采集管理",
					url: "",
					perms: "",
					type: 0,
					icon: "fa fa-coffee",
					orderNum: 6,
					open: null,
					nodes: [
						{
							menuId: 73,
							parentId: 58,
							menuName: "采集用户设置",
							url: "modules/gather/user.html",
							perms: "gather,user",
							type: 1,
							icon: "fa fa-bug",
							orderNum: 0,
							open: null,
							list: null,
							parentName: null
						},
						{
							menuId: 74,
							parentId: 58,
							menuName: "采集代理池设置",
							url: "modules/gather/agency.html",
							perms: "gather,agency",
							type: 1,
							icon: "fa fa-bug",
							orderNum: 0,
							open: null,
							list: null,
							parentName: null
						},
						{
							menuId: 83,
							parentId: 58,
							menuName: "采集内容设置",
							url: "modules/gather/contentList.html",
							perms: "gather",
							type: 1,
							icon: "fa fa-bell",
							orderNum: 0,
							open: null,
							list: null,
							parentName: null
						},
						{
							menuId: 75,
							parentId: 58,
							menuName: "采集内容列表",
							url: "modules/gather/content.html",
							perms: "gather,content",
							type: 1,
							icon: "fa fa-car",
							orderNum: 1,
							open: null,
							list: null,
							parentName: null
						}
					],
					parentName: null
				},
				{
					menuId: 59,
					parentId: 0,
					menuName: "基础配置管理",
					url: "",
					perms: "",
					type: 0,
					icon: "fa fa-check",
					orderNum: 7,
					open: null,
					nodes: [
						{
							menuId: 69,
							parentId: 59,
							menuName: "提示语分类管理",
							url: "modules/basicConfiguration/prompt.html",
							perms: "basic",
							type: 1,
							icon: "fa fa-tasks",
							orderNum: 1,
							open: null,
							list: null,
							parentName: null
						},
						{
							menuId: 70,
							parentId: 59,
							menuName: "提示语配置",
							url: "modules/basicConfiguration/hint.html",
							perms: "basic",
							type: 1,
							icon: "fa fa-tasks",
							orderNum: 1,
							open: null,
							list: null,
							parentName: null
						},
						{
							menuId: 71,
							parentId: 59,
							menuName: "前端基础配置",
							url: "modules/basicConfiguration/frontend.html",
							perms: "basic",
							type: 1,
							icon: "fa fa-tasks",
							orderNum: 1,
							open: null,
							list: null,
							parentName: null
						},
						{
							menuId: 72,
							parentId: 59,
							menuName: "非法关键字管理",
							url: "modules/basicConfiguration/Keyword.html",
							perms: "basic",
							type: 1,
							icon: "fa fa-tasks",
							orderNum: 1,
							open: null,
							list: null,
							parentName: null
						},
						{
							menuId: 81,
							parentId: 59,
							menuName: "APP版本升级",
							url: "modules/basicConfiguration/app.html",
							perms: "basicConfiguration",
							type: 1,
							icon: "fa fa-car",
							orderNum: 1,
							open: null,
							list: null,
							parentName: null
						}
					],
					parentName: null
				}
			]
		}
	};
	return data;
};

export default {
	userLogin: () => userLoginData(),
	userLogOut: () => userLogOut(),
	getMenuList: () => getMenuList(),
	resetPass: () => resetPass()
};
