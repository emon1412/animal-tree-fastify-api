CREATE TABLE IF NOT EXISTS TreeNode (id INTEGER PRIMARY KEY, label TEXT NOT NULL, parentId INT NULL REFERENCES TreeNode(id));
INSERT OR IGNORE INTO TreeNode (id, label, parentId) values (1, 'root', NULL);
INSERT OR IGNORE INTO TreeNode (id, label, parentId) values (2, 'ant', 1);
INSERT OR IGNORE INTO TreeNode (id, label, parentId) values (3, 'bear', 1);
INSERT OR IGNORE INTO TreeNode (id, label, parentId) values (4, 'cat', 3);
INSERT OR IGNORE INTO TreeNode (id, label, parentId) values (5, 'dog', 3);
INSERT OR IGNORE INTO TreeNode (id, label, parentId) values (6, 'elephant', 5);
INSERT OR IGNORE INTO TreeNode (id, label, parentId) values (7, 'frog', 1);