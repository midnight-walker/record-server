/**
 * Created by tqj <2482366539@qq.com> on 2017/9/20.
 */
let highlightStyle={
    fill:{
        fgColor:{
            rgb:"ff0000"
        }
    }
};
let defaultBorderStyle={
    style:"thin",
    color:{
        rgb:"333333"
    }
};
let defaultHeadStyle={
    alignment: {
        vertical: "center",
        horizontal: "center"
    },
    fill:{
        fgColor:{
            rgb:"aaaaaa"
        }
    },
    font:{
        color:{
            rgb:"ffffff"
        },
        bold:"true"
    },
    border:{
        top:defaultBorderStyle,
        bottom:defaultBorderStyle,
        left:defaultBorderStyle,
        right:defaultBorderStyle,
    }
};
let defaultBodyStyle={
    alignment: {
        vertical: "center",
        horizontal: "center"
    },
    font:{
        name:"宋体",
        sz: "10"
    },
    border:{
        top:defaultBorderStyle,
        bottom:defaultBorderStyle,
        left:defaultBorderStyle,
        right:defaultBorderStyle,
    }
};
let defaultBodyAmtStyle={
    alignment: {
        vertical: "center",
        horizontal: "right"
    },
    font:{
        name:"宋体",
        sz: "10"
    },
    border:{
        top:defaultBorderStyle,
        bottom:defaultBorderStyle,
        left:defaultBorderStyle,
        right:defaultBorderStyle,
    }
};
let defaultTitleStyle={
    alignment: {
        vertical: "center",
        horizontal: "center"
    },
    font:{
        name:"宋体",
        sz: "14",
        bold:"true"
    }
};
let defaultLeftTitleStyle={
    alignment: {
        vertical: "center",
        horizontal: "left"
    },
    font:{
        name:"宋体",
        sz: "12"
    }
};
let defaultInfoStyle={
    alignment: {
        horizontal: "left"
    },
    font:{
        name:"宋体",
        sz: "10",
    }
};
let defaultInfoCenterStyle={
    alignment: {
        horizontal: "center",
        vertical: "center"
    },
    font:{
        name:"宋体",
        sz: "10",
    },
    fill:{
        fgColor:{
            rgb:"ffffff"
        }
    },
    border:{
        top:defaultBorderStyle,
        bottom:defaultBorderStyle,
        left:defaultBorderStyle,
        right:defaultBorderStyle,
    }
};
let defaultInfoRightStyle={
    alignment: {
        horizontal: "right"
    },
    font:{
        name:"宋体",
        sz: "10",
    }
};
module.exports={
    highlightStyle,
    defaultBorderStyle,
    defaultHeadStyle,
    defaultBodyStyle,
    defaultTitleStyle,
    defaultLeftTitleStyle,
    defaultInfoStyle,
    defaultInfoCenterStyle,
    defaultInfoRightStyle,
    defaultBodyAmtStyle
};
