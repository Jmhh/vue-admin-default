const Mock = require('mockjs')
// 获取 mock.Random 对象
const Random = Mock.Random

// mock一组数据
const produceData = () => {
	let articles = []
	for (let i = 0; i < 30; i++) {
		let newArticleObject = {
			title: Random.csentence(5, 30), // Random.csentence( min, max )
			thumbnail_pic_s: Random.dataImage('300x250', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
			author_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
			date: Random.date() + ' ' + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
		}
		articles.push(newArticleObject)
	}
	return {
		data: articles
	}
}
Mock.mock('/news', /post|get/i, produceData) //当post或get请求到/news路由时Mock会拦截请求并返回上面的数据

//首页四项状态信息
const statesData = () => {
	let data = {
		studentCount: 216,
		clasCount: 2,
		lastAvgScore: 78,
		avgScore: 82,
		topicCount: 125,
		oTopicCount: 115
	}
	return data
}
Mock.mock('/stats', /post|get/i, statesData)

//首页学生测试列表
const studentLists = () => {
	let data = []
	for (let i = 0; i < 5; i++) {
		let newObject = {
			id: Random.natural(1, 1000),
			name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
			score: Random.natural(1, 150),
			rank: Random.natural(1, 100),
			change: Random.natural(-20, 20),
			date: Random.datetime() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
		}
		data.push(newObject)
	}
	return data
}
Mock.mock('/studentLists', /post|get/i, studentLists)

//首页班级测试情况
Mock.mock('/testStage', /post|get/i, {
	'data|8': [
		{
			'title|+1': 1, //测试序号
			'cScore|60-90': 70, //班级平均分
			'gScore|60-90': 70 //年级2平均分
		}
	]
})

//获取测试情况
const testPeriodAvgs = () => {
	let data = {
		avgScore: 78,
		maxScore: 96,
		minScore: 44,
		passRate: 92,
		excellentCount: 12,
		goodCount: 37,
		passCount: 43,
		failedCount: 8
	}
	return data
}
Mock.mock('/testPeriodAvgs', /post|get/i, testPeriodAvgs)

//获取知识点正确率
Mock.mock('/ratios', /post|get/i, {
	'data|6': [
		{
			'name|+1': [
				'数列的概念',
				'等差数列',
				'等比数列',
				'数列求和',
				'数列的综合应用',
				'数列方程式'
			],
			'successCount|50-90': 50,
			'failedCount|20-40': 50,
			'passRatios|50-90': 50
		}
	]
})

//登录接口
Mock.mock('/login', /post|get/i, {
	name: 'admin',
	password: 123456,
	roleId: 1,
	jwtToken: Random.id()
})

//路由接口
Mock.mock('/roles', /post|get/i, {
	ids: [1, 11, 2, 3, 4, 5, 21, 22, 31, 41, 51, 211, 212, 221, 222],
	roles: [
		{
			name: 'index',
			meta: {
				title: '首页'
			},
			id: 1
		},
		{
			name: 'planRecord',
			meta: {
				title: '周计划填报'
			},
			id: 2,
			children: [
				{
					name: 'thisWeek',
					meta: {
						title: '本周计划'
					},
					id: 21,
					children: [
						{
							name: 'planEdit',
							meta: {
								title: '周计划编辑'
							},
							id: 211
						},
						{
							name: 'planPreview',
							meta: {
								title: '历史计划查看'
							},
							id: 212
						}
					]
				},
				{
					name: 'nextWeek',
					meta: {
						title: '下周计划'
					},
					id: 22,
					children: [
						{
							name: 'planEdit',
							meta: {
								title: '周计划编辑'
							},
							id: 221
						},
						{
							name: 'preview',
							meta: {
								title: '历史计划查看'
							},
							id: 222
						}
					]
				}
			]
		},
		{
			name: 'exam',
			meta: {
				title: '测试'
			},
			id: 3,
			children: [
				{
					name: 'exam_index',
					title: '测试首页',
					meta: {
						title: '分析'
					},
					id: 31
				}
			]
		},
		{
			name: 'class',
			meta: {
				title: '班级'
			},
			id: 4,
			children: [
				{
					name: 'class_index',
					meta: {
						title: '班级首页'
					},
					id: 41
				}
			]
		}
	]
})

//班级情况
const students = () => {
	let data = []
	for (let i = 0; i < 12; i++) {
		let newObject = {
			id: Random.id(),
			studentRealname: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
			totalScore: Random.natural(40, 98),
			sex: Random.natural(0, 1),
			team: 1,
			date: Random.datetime() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
		}
		data.push(newObject)
	}
	return data
}
Mock.mock('/students', /post|get/i, students)

//测试情况
Mock.mock('/examList', /post|get/i, {
	'data|6': [
		{
			id: Random.id(),
			'name|+1': [
				'数学测试',
				'化学测试',
				'数学测试',
				'物理测试',
				'物理测试',
				'数学测试'
			],
			'correctCount|50-90': 50,
			'ranking|1-8': 4,
			'avgScore|50-90': 50
		}
	]
})

//表格列表
Mock.mock('/thisPreTableList', /post|get/i, {
	title: '本周查看列表',
	'result|6': [
		{
			id: Random.id(),
			'send_status|1-3': 1,
			'work_date|10-90': 50,
			'begin_date|1': [
				'2019-12-27',
				'2019-12-07',
				'2019-11-27',
				'2019-10-27',
				'2019-12-24',
				'2019-12-13'
			],
			'end_date|1': [
				'2019-12-27',
				'2019-12-07',
				'2019-11-27',
				'2019-10-27',
				'2019-12-24',
				'2019-12-13'
			],
			'work_id|1-4': 1,
			'is_point|1-2': 1,
			'work_status|1-2': 1
		}
	],
	titles: [
		//type-1字符串 2-下拉选择 3-日期选择
		{
			name: '报送状态',
			value: 'send_status',
			type: 2,
			typeValue: [
				{
					name: '已暂存',
					value: 1
				},
				{
					name: '已回退',
					value: 2
				},
				{
					name: '已提交',
					value: 3
				}
			]
		},
		{
			name: '工时',
			value: 'work_date',
			type: 1,
			typeValue: null
		},
		{
			name: '开始日期',
			value: 'begin_date',
			type: 3,
			typeValue: null
		},
		{
			name: '完成日期',
			value: 'end_date',
			type: 3,
			typeValue: null
		},
		{
			name: '项目',
			value: 'work_id',
			type: 2,
			typeValue: [
				{
					name: '大桥工程',
					value: 1
				},
				{
					name: '民生工程',
					value: 2
				},
				{
					name: '教育工程',
					value: 3
				},
				{
					name: '城市建设工程',
					value: 4
				}
			]
		},
		{
			name: '是否重点',
			value: 'is_point',
			type: 2,
			typeValue: [
				{
					name: '是',
					value: 1
				},
				{
					name: '否',
					value: 2
				}
			]
		},
		{
			name: '完成状态',
			value: 'work_status',
			type: 2,
			typeValue: [
				{
					name: '已完成',
					value: 1
				},
				{
					name: '未完成',
					value: 2
				}
			]
		}
	]
})

Mock.mock('/thisEditTableList', /post|get/i, {
	title: '本周修改列表',
	'result|6': [
		{
			id: Random.id(),
			'send_status|1-3': 1,
			'work_date|10-90': 50,
			'begin_date|1': [
				'2019-12-27',
				'2019-12-07',
				'2019-11-27',
				'2019-10-27',
				'2019-12-24',
				'2019-12-13'
			],
			'end_date|1': [
				'2019-12-27',
				'2019-12-07',
				'2019-11-27',
				'2019-10-27',
				'2019-12-24',
				'2019-12-13'
			],
			'work_id|1-4': 1,
			'is_point|1-2': 1,
			'work_status|1-2': 1
		}
	],
	titles: [
		//type-1字符串 2-下拉选择 3-日期选择
		{
			name: '报送状态',
			value: 'send_status',
			type: 2,
			typeValue: [
				{
					name: '已暂存',
					value: 1
				},
				{
					name: '已回退',
					value: 2
				},
				{
					name: '已提交',
					value: 3
				}
			]
		},
		{
			name: '工时',
			value: 'work_date',
			type: 1,
			typeValue: null
		},
		{
			name: '开始日期',
			value: 'begin_date',
			type: 3,
			typeValue: null
		},
		{
			name: '完成日期',
			value: 'end_date',
			type: 3,
			typeValue: null
		},
		{
			name: '项目',
			value: 'work_id',
			type: 2,
			typeValue: [
				{
					name: '大桥工程',
					value: 1
				},
				{
					name: '民生工程',
					value: 2
				},
				{
					name: '教育工程',
					value: 3
				},
				{
					name: '城市建设工程',
					value: 4
				}
			]
		},
		{
			name: '是否重点',
			value: 'is_point',
			type: 2,
			typeValue: [
				{
					name: '是',
					value: 1
				},
				{
					name: '否',
					value: 2
				}
			]
		},
		{
			name: '完成状态',
			value: 'work_status',
			type: 2,
			typeValue: [
				{
					name: '已完成',
					value: 1
				},
				{
					name: '未完成',
					value: 2
				}
			]
		}
	]
})

Mock.mock('/nextPreTableList', /post|get/i, {
	title: '下周查看列表',
	'result|6': [
		{
			id: Random.id(),
			'send_status|1-3': 1,
			'work_date|10-90': 50,
			'begin_date|1': [
				'2019-12-27',
				'2019-12-07',
				'2019-11-27',
				'2019-10-27',
				'2019-12-24',
				'2019-12-13'
			],
			'end_date|1': [
				'2019-12-27',
				'2019-12-07',
				'2019-11-27',
				'2019-10-27',
				'2019-12-24',
				'2019-12-13'
			],
			'work_id|1-4': 1,
			'is_point|1-2': 1,
			'work_status|1-2': 1
		}
	],
	titles: [
		//type-1字符串 2-下拉选择 3-日期选择
		{
			name: '报送状态',
			value: 'send_status',
			type: 2,
			typeValue: [
				{
					name: '已暂存',
					value: 1
				},
				{
					name: '已回退',
					value: 2
				},
				{
					name: '已提交',
					value: 3
				}
			]
		},
		{
			name: '工时',
			value: 'work_date',
			type: 1,
			typeValue: null
		},
		{
			name: '开始日期',
			value: 'begin_date',
			type: 3,
			typeValue: null
		},
		{
			name: '完成日期',
			value: 'end_date',
			type: 3,
			typeValue: null
		},
		{
			name: '项目',
			value: 'work_id',
			type: 2,
			typeValue: [
				{
					name: '大桥工程',
					value: 1
				},
				{
					name: '民生工程',
					value: 2
				},
				{
					name: '教育工程',
					value: 3
				},
				{
					name: '城市建设工程',
					value: 4
				}
			]
		},
		{
			name: '是否重点',
			value: 'is_point',
			type: 2,
			typeValue: [
				{
					name: '是',
					value: 1
				},
				{
					name: '否',
					value: 2
				}
			]
		},
		{
			name: '完成状态',
			value: 'work_status',
			type: 2,
			typeValue: [
				{
					name: '已完成',
					value: 1
				},
				{
					name: '未完成',
					value: 2
				}
			]
		}
	]
})

Mock.mock('/nextEditTableList', /post|get/i, {
	title: '本周修改列表',
	'result|6': [
		{
			id: Random.id(),
			'send_status|1-3': 1,
			'work_date|10-90': 50,
			'begin_date|1': [
				'2019-12-27',
				'2019-12-07',
				'2019-11-27',
				'2019-10-27',
				'2019-12-24',
				'2019-12-13'
			],
			'end_date|1': [
				'2019-12-27',
				'2019-12-07',
				'2019-11-27',
				'2019-10-27',
				'2019-12-24',
				'2019-12-13'
			],
			'work_id|1-4': 1,
			'is_point|1-2': 1,
			'work_status|1-2': 1
		}
	],
	titles: [
		//type-1字符串 2-下拉选择 3-日期选择
		{
			name: '报送状态',
			value: 'send_status',
			type: 2,
			typeValue: [
				{
					name: '已暂存',
					value: 1
				},
				{
					name: '已回退',
					value: 2
				},
				{
					name: '已提交',
					value: 3
				}
			]
		},
		{
			name: '工时',
			value: 'work_date',
			type: 1,
			typeValue: null
		},
		{
			name: '开始日期',
			value: 'begin_date',
			type: 3,
			typeValue: null
		},
		{
			name: '完成日期',
			value: 'end_date',
			type: 3,
			typeValue: null
		},
		{
			name: '项目',
			value: 'work_id',
			type: 2,
			typeValue: [
				{
					name: '大桥工程',
					value: 1
				},
				{
					name: '民生工程',
					value: 2
				},
				{
					name: '教育工程',
					value: 3
				},
				{
					name: '城市建设工程',
					value: 4
				}
			]
		},
		{
			name: '是否重点',
			value: 'is_point',
			type: 2,
			typeValue: [
				{
					name: '是',
					value: 1
				},
				{
					name: '否',
					value: 2
				}
			]
		},
		{
			name: '完成状态',
			value: 'work_status',
			type: 2,
			typeValue: [
				{
					name: '已完成',
					value: 1
				},
				{
					name: '未完成',
					value: 2
				}
			]
		}
	]
})
