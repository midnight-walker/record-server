let admin=[
    {
        "name":"首页",
        "list":[
            {
                "id":"index",
                "name":"首页"
            }
        ],
        "prop":"index"
    },
    {
        "name":"系统设置",
        "list":[
            /*{
                "id":"user",
                "name":"用户"
            },
            {
                "id":"region",
                "name":"区县"
            },
            {
                "id":"station",
                "name":"林场"
            },*/
            {
                "id":"member",
                "name":"监理员"
            },
            {
                "id":"workGroup",
                "name":"除治队"
            },
        ],
        "prop":"system"
    },
    {
        "name":"业务设置",
        "list":[
            /*{
                "id":"projectCreate",
                "name":"创建项目"
            },*/
            {
                "id":"project",
                "name":"项目"
            },
            {
                "id":"recordType",
                "name":"记录类型"
            }
        ],
        "prop":"books"
    },
    {
        "name":"业务列表",
        "list":[
            {
                "id":"supervisorDetail",
                "name":"业务记录"
            },
            {
                "id":"supervisor",
                "name":"监理点"
            },
            {
                "id":"supervisorImport",
                "name":"监理记录导入"
            },
            {
                "id":"supervisorTotal",
                "name":"监理统计"
            }
        ],
        "prop":"voucher"
    }
]

let web=[

]
module.exports={
    admin,
    web
}