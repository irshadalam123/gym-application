/**
 * Members API endpoints – URLs and HTTP methods
 */
import methods from "../../store/method";

const url = {
  getMembers: {
    endpoint: `members`,
    method: methods.GET,
  },
  getMemberById: {
    endpoint: `members`,
    method: methods.GET,
  },
  createMember: {
    endpoint: `members`,
    method: methods.POST,
  },
  updateMember: {
    endpoint: `members`,
    method: methods.PATCH,
  },
  deleteMember: {
    endpoint: `members`,
    method: methods.DELETE,
  },
};

export default url;
