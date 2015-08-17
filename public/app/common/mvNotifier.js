angular.module('app').value('mvToastr', toastr);

angular.module('app').service('mvNotifier', function(mvToastr) {
  return {
    notify: function(message) {
      mvToastr.success(message);
      console.log(message);
    }
  };
});
