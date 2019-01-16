import { TestBed, inject } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import * as fromPost from '../state';
import { PostService } from './post.service';
import { ApiService } from '../../core/services/api.service';
import { post } from 'selenium-webdriver/http';

describe('PostService', () => {
  beforeEach(() => {
    const apiServiceStub: Partial<ApiService> = {
      getPosts: jest.fn(),
      putPost: jest.fn()
    };
    const storeStub: Partial<Store<fromPost.State>> = { dispatch: jest.fn() };

    TestBed.configureTestingModule({
      providers: [
        PostService,
        {
          provide: ApiService,
          useValue: apiServiceStub
        },
        { provide: Store, useValue: storeStub }
      ]
    });
  });

  it('should be created', inject([PostService], (service: PostService) => {
    expect(service).toBeTruthy();
  }));

  it('should call api getposts', done => {
    inject(
      [PostService, ApiService],
      (postService: PostService, apiService: ApiService) => {
        const spy = jest.spyOn(apiService, 'getPosts');
        spy.mockReturnValue(of('mock value'));
        postService.getPosts().subscribe(r => {
          expect(spy).toHaveBeenCalled();
          done();
        });
      }
    )();
  });

  it('should call api putPost', done => {
    inject(
      [PostService, ApiService],
      (postService: PostService, apiService: ApiService) => {
        const spy = jest.spyOn(apiService, 'putPost');
        spy.mockReturnValue(of('mock value post'));
        postService
          .updatePost({
            id: 1,
            favourite: false,
            first_name: 'Test',
            last_name: 'Name',
            post: 'Testing',
            title: 'Test Post'
          })
          .subscribe(r => {
            expect(spy).toHaveBeenCalledWith(
              expect.objectContaining({
                id: 1
              })
            );
            done();
          });
      }
    )();
  });

  it('dispatch call favourite action', inject(
    [PostService, Store],
    (postService: PostService, store: Store<fromPost.State>) => {
      const spy = jest.spyOn(store, 'dispatch');
      postService.dispatchFavouritePostAction({
        id: 1,
        favourite: false,
        first_name: 'Test',
        last_name: 'Name',
        post: 'Testing',
        title: 'Test Post'
      });
      const expectedArgument = new fromPost.PostActions.FavouritePost(1);
      expect(spy).toHaveBeenCalledWith(expectedArgument);
    }
  ));

  it('dispatch call load posts action', inject(
    [PostService, Store],
    (postService: PostService, store: Store<fromPost.State>) => {
      const spy = jest.spyOn(store, 'dispatch');
      postService.dispatchLoadPostAction();
      const expectedArgument = new fromPost.PostActions.LoadPosts();
      expect(spy).toHaveBeenCalledWith(expectedArgument);
    }
  ));
});
