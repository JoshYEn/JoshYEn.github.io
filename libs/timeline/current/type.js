/* --- */
/* labaix.com/timeline */
/* --- */
function Phase(Name, Color, Comments) {
    /* --- */
    this.Name = smartquotes(Name);
    this.Color = Color;
    this.Comments = smartquotes(Comments);
    this.Beginning = 0;
    this.End = 0;
    this.Time = 0;
    this.Func = function() {};
    this.Value = 0;
    /* --- */
};
/* --- */
function Variable(Name, Value, Comments) {
    /* --- */
    this.Name = smartquotes(Name);
    this.Value = Value;
    this.Comments = smartquotes(Comments);
    /* --- */
};
/* --- */