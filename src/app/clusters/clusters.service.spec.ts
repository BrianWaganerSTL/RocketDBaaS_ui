import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
// Other imports
import {TestBed} from '@angular/core/testing';
import {HttpClient, HttpResponse} from '@angular/common/http';

import {Cluster} from './cluster.model';
import {ClustersService} from './clusters.service';
import {HttpErrorHandler} from '../http-error-handler.service';
import {MessageService} from '../message.service';

describe('ClustersService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let clusterService: ClustersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [HttpClientTestingModule],
      // Provide the service-under-test and its dependencies
      providers: [
        ClustersService,
        HttpErrorHandler,
        MessageService
      ]
    });

    // Inject the http, test controller, and service-under-test
    // as they will be referenced by each test.
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    clusterService = TestBed.get(ClustersService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  /// ClusterService method tests begin ///

  describe('#getClusters', () => {
    let expectedClusters: Cluster[];

    beforeEach(() => {
      clusterService = TestBed.get(ClustersService);
      expectedClusters = [
        {id: 1, name: 'A'},
        {id: 2, name: 'B'},
      ] as Cluster[];
    });

    it('should return expected clusters (called once)', () => {

      clusterService.getClusters().subscribe(
        clusters => expect(clusters).toEqual(expectedClusters, 'should return expected clusters'),
        fail
      );

      // ClusterService should have made one request to GET clusters from expected URL
      const req = httpTestingController.expectOne(clusterService.clustersUrl);
      expect(req.request.method).toEqual('GET');

      // Respond with the mock clusters
      req.flush(expectedClusters);
    });

    it('should be OK returning no clusters', () => {

      clusterService.getClusters().subscribe(
        clusters => expect(clusters.length).toEqual(0, 'should have empty clusters array'),
        fail
      );

      const req = httpTestingController.expectOne(clusterService.clustersUrl);
      req.flush([]); // Respond with no clusters
    });

    // This service reports the error but finds a way to let the app keep going.
    it('should turn 404 into an empty clusters result', () => {

      clusterService.getClusters().subscribe(
        clusters => expect(clusters.length).toEqual(0, 'should return empty clusters array'),
        fail
      );

      const req = httpTestingController.expectOne(clusterService.clustersUrl);

      // respond with a 404 and the error message in the body
      const msg = 'deliberate 404 error';
      req.flush(msg, {status: 404, statusText: 'Not Found'});
    });

    it('should return expected clusters (called multiple times)', () => {

      clusterService.getClusters().subscribe();
      clusterService.getClusters().subscribe();
      clusterService.getClusters().subscribe(
        clusters => expect(clusters).toEqual(expectedClusters, 'should return expected clusters'),
        fail
      );

      const requests = httpTestingController.match(clusterService.clustersUrl);
      expect(requests.length).toEqual(3, 'calls to getClusters()');

      // Respond to each request with different mock cluster results
      requests[0].flush([]);
      requests[1].flush([{id: 1, name: 'bob'}]);
      requests[2].flush(expectedClusters);
    });
  });

  describe('#updateCluster', () => {
    // Expecting the query form of URL so should not 404 when id not found
    const makeUrl = (id: number) => `${clusterService.clustersUrl}/?id=${id}`;

    it('should update a Cluster and return it', () => {

      const updateCluster: Cluster = {id: 1, name: 'A'};

      clusterService.updateCluster(updateCluster).subscribe(
        data => expect(data).toEqual(updateCluster, 'should return the cluster'),
        fail
      );

      // ClusterService should have made one request to PUT cluster
      const req = httpTestingController.expectOne(clusterService.clustersUrl);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(updateCluster);

      // Expect server to return the cluster after PUT
      const expectedResponse = new HttpResponse(
        {status: 200, statusText: 'OK', body: updateCluster});
      req.event(expectedResponse);
    });

    // This service reports the error but finds a way to let the app keep going.
    it('should turn 404 error into return of the update cluster', () => {
      const updateCluster: Cluster = {id: 1, name: 'A'};

      clusterService.updateCluster(updateCluster).subscribe(
        data => expect(data).toEqual(updateCluster, 'should return the update cluster'),
        fail
      );

      const req = httpTestingController.expectOne(clusterService.clustersUrl);

      // respond with a 404 and the error message in the body
      const msg = 'deliberate 404 error';
      req.flush(msg, {status: 404, statusText: 'Not Found'});
    });
  });

  // TODO: test other ClusterService methods
});
