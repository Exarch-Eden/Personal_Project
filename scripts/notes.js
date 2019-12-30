/*
  show the modal for post creation which allows the user
  to enter a title (header) and body (text) for the post
*/
function showModal() {
    var modal = "<div id='modal'>\
    <!-- Button trigger modal -->\
    <button type='button' class='btn btn-primary btn-lg' data-toggle='modal' data-target='#modelId'>\
    Create New Post\
  </button>\
  <!-- Modal -->\
  <div class='modal fade' id='modelId' tabindex='-1' role='dialog' aria-labelledby='modelTitleId'\
    aria-hidden='true'>\
    <div class='modal-dialog' role='document'>\
      <div class='modal-content'>\
        <div class='modal-header'>\
          <h5 class='modal-title'>Post Creation</h5>\
          <button type='button' class='close' data-dismiss='modal' aria-label='Close'>\
            <span aria-hidden='true'>&times;</span>\
          </button>\
        </div>\
        <div class='modal-body'>\
        <!-- Insert Form Inputs Here... -->\
          <div class='container-fluid'>\
            <div class='form-group'>\
            <!-- Post Header Input -->\
              <label for='headerInput'>Header</label>\
              <input type='text' class='form-control' name='text' id='headerInput' aria-describedby='helpId'\
                placeholder=''>\
                <!-- Post Text Body Input -->\
              <label for='bodyInput'>Body</label>\
              <textarea class='form-control' name='text' id='bodyInput' rows='3'></textarea>\
            </div>\
          </div>\
          <!-- End of Form -->\
        </div>\
        <div class='modal-footer'>\
          <button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button>\
          <button type='button' class='btn btn-primary'>Post</button>\
        </div>\
      </div>\
    </div>\
  </div>\
  </div>";
    contents.append(modal);
}