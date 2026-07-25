export const DEVELOPER_WORDS = [
  'async', 'await', 'function', 'variable', 'compiler', 'interpreter', 'debugging', 'repository', 
  'interface', 'class', 'constructor', 'inheritance', 'polymorphism', 'encapsulation', 'framework', 
  'library', 'dependency', 'middleware', 'deployment', 'database', 'server', 'client', 'api', 
  'endpoint', 'request', 'response', 'payload', 'header', 'cookie', 'token', 'session', 'cache', 
  'buffer', 'stream', 'thread', 'process', 'mutex', 'semaphore', 'deadlock', 'recursion', 
  'iteration', 'pointer', 'reference', 'garbage', 'collector', 'memory', 'leak', 'stack', 'heap', 
  'queue', 'tree', 'graph', 'hash', 'table', 'map', 'set', 'list', 'array', 'tuple', 'dictionary', 
  'struct', 'union', 'enum', 'generic', 'type', 'cast', 'exception', 'error', 'handler', 'callback', 
  'promise', 'observable', 'subject', 'event', 'listener', 'emitter', 'dispatch', 'action', 
  'reducer', 'state', 'context', 'hook', 'component', 'prop', 'ref', 'effect', 'memo', 'route', 
  'router', 'controller', 'model', 'view', 'template', 'style', 'stylesheet', 'script', 'markup', 
  'tag', 'attribute', 'selector', 'query', 'mutation', 'resolver', 'schema', 'migration', 
  'transaction', 'index', 'constraint', 'foreign', 'key', 'primary', 'join', 'merge', 'rebase', 
  'commit', 'push', 'pull', 'clone', 'fork', 'branch', 'checkout', 'stash', 'diff', 'patch', 
  'conflict', 'resolve', 'pipeline', 'build', 'test', 'debug', 'lint', 'format', 'compile', 
  'bundle', 'minify', 'uglify', 'transpile', 'deploy', 'release', 'version', 'semantic', 'patch', 
  'minor', 'major', 'deprecated', 'legacy', 'refactor', 'optimize', 'performance', 'latency', 
  'throughput', 'bandwidth', 'scaling', 'load', 'balancer', 'cluster', 'node', 'container', 'pod', 
  'service', 'ingress', 'volume', 'registry', 'image', 'docker', 'kubernetes', 'aws', 'azure', 
  'gcp', 'cloud', 'serverless', 'lambda', 'gateway', 'proxy', 'reverse', 'ssl', 'tls', 'certificate', 
  'security', 'encryption', 'decryption', 'hashing', 'salting', 'auth', 'login', 'logout', 'register', 
  'signup', 'signin', 'signout', 'password', 'passphrase', 'jwt', 'oauth', 'saml', 'ldap', 'roles', 
  'rbac', 'abac', 'acl', 'firewall', 'vpc', 'subnet', 'network', 'ip', 'dns', 'port', 'protocol', 
  'http', 'https', 'ftp', 'ssh', 'sftp', 'tcp', 'udp', 'websocket', 'grpc', 'graphql', 'rest', 'soap', 
  'json', 'xml', 'yaml', 'csv', 'binary', 'hex', 'octal', 'decimal', 'float', 'double', 'integer', 
  'boolean', 'string', 'char', 'null', 'undefined', 'void', 'never', 'unknown', 'any', 'symbol', 
  'bigint', 'bitwise', 'shift', 'bitwise-and', 'bitwise-or', 'bitwise-xor', 'modulo', 'increment', 
  'decrement', 'assignment', 'comparison', 'logical', 'ternary', 'destructuring', 'spread', 
  'rest-parameter', 'modules', 'es6', 'commonjs', 'typescript', 'transpilation', 'bundler', 
  'webpack', 'vite', 'rollup', 'esbuild', 'turbopack', 'npm', 'yarn', 'pnpm', 'deno', 'bun'
];

export const generateWords = (count: number): string[] => {
  const words: string[] = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * DEVELOPER_WORDS.length);
    words.push(DEVELOPER_WORDS[randomIndex]);
  }
  return words;
};
