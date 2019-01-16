/**
 * Tests in here may not really be useful cause this service just calls the api
 * Tests should ideally be on the API endpoints themselves but in this case just testing if
 * the correct urls are being used
 */
import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { ApiService } from './api.service';
import { Post } from '../../post/models/post';

describe('ApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
  });

  it('should be created', inject([ApiService], (service: ApiService) => {
    expect(service).toBeTruthy();
  }));

  it('should call get posts api', inject(
    [ApiService, HttpTestingController],
    (apiService: ApiService, httpMock: HttpTestingController) => {
      apiService.getPosts().subscribe((p: Post[]) => {
        expect(p.length).toBe(2);
      });

      const mockReq = httpMock.expectOne('/api/posts');
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.method).toBe('GET');

      mockReq.flush([
        {
          id: 1
        },
        {
          id: 2
        }
      ]);

      httpMock.verify();
    }
  ));

  it('should call get post api', inject(
    [ApiService, HttpTestingController],
    (apiService: ApiService, httpMock: HttpTestingController) => {
      apiService.getPost(1).subscribe((p: Post) => {
        expect(p.id).toBe(1);
      });

      const mockReq = httpMock.expectOne('/api/posts/1');
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.method).toBe('GET');

      mockReq.flush({
        id: 1
      });

      httpMock.verify();
    }
  ));

  it('should call put post api', inject(
    [ApiService, HttpTestingController],
    (apiService: ApiService, httpMock: HttpTestingController) => {
      apiService
        .putPost({
          id: 1
        })
        .subscribe();

      const mockReq = httpMock.expectOne('/api/posts/1');
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.method).toBe('PUT');
      expect(mockReq.request.body).toMatchObject({
        id: 1
      });

      mockReq.flush({
        id: 1
      });

      httpMock.verify();
    }
  ));
});
