import { Injectable } from "@angular/core";
import { State, Action, StateContext, Selector } from "@ngxs/store";
import { tap } from "rxjs";
import { IUser } from "../core/models/auth.model";
import { UserService } from "../core/services/user.service";

export class GetAllUser {
  static readonly type = '[User] Get All';
}

export class GetLoggedInUser {
  static readonly type = '[User] Get Logged In User';
}

export interface UserStateModel {
  users: IUser[] | undefined;
  user: IUser | null;
}

@State<UserStateModel>({
  name: 'User',
  defaults: {
    users: [],
    user: null,
  },
})
@Injectable()
export class UserState {
  constructor(private userService: UserService) {}

  @Action(GetLoggedInUser)
  getLoggedInUser(ctx: StateContext<UserStateModel>) {
    return this.userService.loggedInUser().pipe(
      tap((response) => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          user: response.data,
        });
      })
    );
  }

  @Action(GetAllUser)
  getAllUser(ctx: StateContext<UserStateModel>) {
    return this.userService.getAllUsers().pipe(
      tap((response) => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          users: response.data.filter((u) => u._id !== state.user?._id),
        });
      })
    );
  }

  @Selector([UserState])
  static selectUsers(state: UserStateModel): IUser[] | undefined {
    return state.users;
  }

  @Selector([UserState])
  static getLoggedUser(state: UserStateModel): IUser | null {
    return state.user;
  }
}
