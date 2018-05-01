
      var Comment = React.createClass({
                  getInitialState: function(){
                      return {editing: false};
                  },
                  edit: function(){
                    this.setState({editing: true});
                  },
                  save: function(){
                    var tex = this.refs.newText.value;
                    this.props.updateComment(tex,this.props.index);
                    this.setState({editing: false});
                  },
                  remove: function(){
                    this.props.deleteComment(this.props.index);
                  },
                  renderNormal: function(){
                    return(
                        <div className="note">
                          <div className = "remove-note">
                            <span className = "glyphicon glyphicon-remove" onClick={this.remove}/>
                          </div>
                          <div className="comment">
                            {this.props.children}
                          </div>  
                          <div className="edit-note">
                           <a className = "edit-a" onClick = {this.edit}>EDIT</a>
                          </div>
                        </div>
                  )
                  },
                  renderForm: function(){
                    return(
                        <div className="note">
                          <textarea defaultValue={this.props.children} ref="newText" className="edit-note form-control" rows="3"/>
                          <div className="edit-note">
                            <a className = "edit-a" onClick = {this.save}>Save</a>
                           </div>
                          
                        </div>
                  )
                  },
                  render: function(){
                      if(this.state.editing){
                        return this.renderForm();
                      }else{
                        return this.renderNormal();
                      }
                    }
      });

      var Board = React.createClass(
        {
          getInitialState: function(){
            return {
              comments: []
            }
          },
          removeComment: function(i){
            var arr = this.state.comments;
            arr.splice(i,1);
            this.setState({comments: arr});
          },
          saveComment: function(item,i){
            var arr = this.state.comments;
            arr[i] = item;
            this.setState({comments: arr});
          },
          addComment: function(){
            console.log("in AddComment");
            var arr = this.state.comments;
            arr.unshift("Click Edit to edit this Note");
            console.log(arr);
            this.setState({comments: arr});
          },
          eachComment: function(item, i){
            return (<Comment key = {i} index = {i} addNew= {this.addComment} deleteComment = {this.removeComment} updateComment = {this.saveComment}>{item}</Comment>)
          },
          render: function(){
            return(
              <div>
                <nav className="navbar navbar-expand-lg navbar-inverse">
                  <div className= "container-fluid">
                    <div className="navbar-header">
                        <a href="#" className="navbar-brand">My Notebook</a>
                        <button className="navbar-toggle" data-toggle="collapse" data-target="#navbarSupportedContent">
                          <span className="icon-bar"></span>
                          <span className="icon-bar"></span>
                          <span className="icon-bar"></span>
                        </button>
                    </div>
                    
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                      <div className="add-note nav-item navbar-right">
                        <a onClick={this.addComment} className="visible-md visible-lg visible-sm visible-xs">Add Note</a>
                        
                      </div>
                    </div>
                    
                 </div> 
                </nav>
                <div className="flex-container">
                  {this.state.comments.map(this.eachComment)}
                </div>
              </div>
              )}
        });

   
   
   
    
    
     ReactDOM.render(
          <div>
            <Board/>
          </div>,
            document.getElementById('container')
        );
     