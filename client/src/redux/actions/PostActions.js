import * as PostsApi from "../api/PostRequests";

export const getTimelinePosts = (id) => async (dispatch) => {
  dispatch({ type: "RETREIVING_START" });
  try {
    const { data } = await PostsApi.getTimelinePosts(id);
    dispatch({ type: "RETREIVING_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "RETREIVING_FAIL" });
  }
};

// export const updatePost = (id) => async (dispatch) => {
//   dispatch({ type: "UPDATING_START" });
//   try {
    
//   } catch (e) {
//     console.log(e);
//     dispatch({ type: "UPDATING_FAIL" });    
//   }
// }

// export const deletePost = (id) => async (dispatch) => {
//   dispatch({ type: "DELETING_START" });
//   try {
//     const { data } = await PostsApi.deletePost(id);
//     dispatch({ type: "DELETING_SUCCESS", data: data });
//   } catch (e) {
//     console.log(e);
//     dispatch({ type: "DELETING_FAIL" });
//   }
// };
